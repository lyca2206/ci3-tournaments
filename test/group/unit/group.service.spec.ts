import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from 'src/group/group.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from 'src/group/entities/group.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { NotFoundException } from '@nestjs/common';

describe('GroupService', () => {
  let service: GroupService;
  let groupRepository: Repository<Group>;
  let tournamentRepository: Repository<Tournament>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: getRepositoryToken(Group),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Tournament),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    groupRepository = module.get<Repository<Group>>(getRepositoryToken(Group));
    tournamentRepository = module.get<Repository<Tournament>>(
      getRepositoryToken(Tournament),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGroup', () => {
    it('should create and return a group', async () => {
      const createGroupDto = {
        name: 'group1',
        seeding: 1,
        tournamentId: 'tournament-id',
      };
      const tournament = { id: 'tournament-id' } as Tournament;

      jest
        .spyOn(tournamentRepository, 'findOne')
        .mockResolvedValueOnce(tournament);
      jest.spyOn(groupRepository, 'create').mockReturnValueOnce({
        ...createGroupDto,
        tournament,
      } as unknown as Group);
      jest.spyOn(groupRepository, 'save').mockResolvedValueOnce({
        ...createGroupDto,
        tournament,
      } as unknown as Group);

      const result = await service.createGroup(createGroupDto);
      expect(result.name).toBe('group1');
      expect(result.seeding).toBe(1);
    });

    it('should throw a NotFoundException if tournament is not found', async () => {
      const createGroupDto = {
        name: 'group1',
        seeding: 1,
        tournamentId: 'tournament-id',
      };
      jest.spyOn(tournamentRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.createGroup(createGroupDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // Otras pruebas para las funciones getGroupByID, getGroupsByTournamentID, updateGroup, etc.
});
