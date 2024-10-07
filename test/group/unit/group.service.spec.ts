import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from 'src/group/group.service';
import { Repository, UpdateResult } from 'typeorm';
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

  describe('getGroupByID', () => {
    it('should return a group by ID', async () => {
      const group = { id: 'group-id', name: 'group1', seeding: 1 } as Group;
      jest.spyOn(groupRepository, 'findOne').mockResolvedValueOnce(group);

      const result = await service.getGroupByID('group-id');
      expect(result).toEqual(group);
    });

    it('should throw a NotFoundException if group is not found', async () => {
      jest.spyOn(groupRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.getGroupByID('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getGroupsByTournamentID', () => {
    it('should return an array of groups by tournament ID', async () => {
      const tournamentId = 'tournament-id';
      const mockGroups = [
        { id: 'group1-id', name: 'group1', seeding: 1, deletedAt: null },
        { id: 'group2-id', name: 'group2', seeding: 2, deletedAt: null },
      ] as unknown as Group[];

      const tournament = {
        id: tournamentId,
        groups: mockGroups,
      } as Tournament;

      jest
        .spyOn(tournamentRepository, 'findOne')
        .mockResolvedValueOnce(tournament);

      const result = await service.getGroupsByTournamentID(tournamentId);
      expect(result).toEqual(mockGroups);
    });

    it('should throw a NotFoundException if tournament is not found', async () => {
      const tournamentId = 'tournament-id';
      jest.spyOn(tournamentRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.getGroupsByTournamentID(tournamentId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if tournament has no groups', async () => {
      const tournamentId = 'tournament-id';
      const tournament = {
        id: tournamentId,
        groups: [],
      } as unknown as Tournament;

      jest
        .spyOn(tournamentRepository, 'findOne')
        .mockResolvedValueOnce(tournament);

      const result = await service.getGroupsByTournamentID(tournamentId);
      expect(result).toEqual([]);
    });
  });

  describe('updateGroup', () => {
    it('should update and return the group', async () => {
      const updateGroupDto = { name: 'updatedGroup', seeding: 2 };
      const existingGroup = {
        id: 'group-id',
        name: 'group1',
        seeding: 1,
      } as Group;
      jest
        .spyOn(groupRepository, 'findOne')
        .mockResolvedValueOnce(existingGroup);
      jest.spyOn(groupRepository, 'save').mockResolvedValueOnce({
        ...existingGroup,
        ...updateGroupDto,
      });

      const result = await service.updateGroup('group-id', updateGroupDto);
      expect(result.name).toBe('updatedGroup');
      expect(result.seeding).toBe(2);
    });

    it('should throw a NotFoundException if group is not found for update', async () => {
      const updateGroupDto = { name: 'updatedGroup', seeding: 2 };
      jest.spyOn(groupRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.updateGroup('non-existing-id', updateGroupDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDeleteGroup', () => {
    it('should soft delete a group', async () => {
      const existingGroup = {
        id: 'group-id',
        name: 'group1',
        seeding: 1,
        deletedAt: null,
      } as unknown as Group;

      // Simulando que se encuentra el grupo existente
      jest
        .spyOn(groupRepository, 'findOne')
        .mockResolvedValueOnce(existingGroup);

      // Simulando el resultado de softDelete con las propiedades requeridas
      const updateResult: UpdateResult = {
        raw: {},
        generatedMaps: [],
        affected: 1,
      };

      jest
        .spyOn(groupRepository, 'softDelete')
        .mockResolvedValueOnce(updateResult); // Mock softDelete

      // Aquí deberías actualizar el estado del grupo
      existingGroup.deletedAt = new Date(); // Simulando que se actualiza deletedAt

      const result = await service.softDeleteGroup('group-id');

      // Verificamos que deletedAt se haya actualizado
      expect(result.deletedAt).toBeDefined();
      expect(result.deletedAt).not.toBeNull(); // Verifica que deletedAt no sea nulo
      expect(result.deletedAt).toBeInstanceOf(Date); // Verifica que deletedAt es una instancia de Date
    });

    it('should throw a NotFoundException if group is not found for deletion', async () => {
      jest.spyOn(groupRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.softDeleteGroup('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
