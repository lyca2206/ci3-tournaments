import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from 'src/group/group.controller';
import { GroupService } from 'src/group/group.service';
import { CreateGroupDto } from 'src/group/DTO/create_group.dto';
import { UpdateGroupDto } from 'src/group/DTO/update_group.dto';

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        {
          provide: GroupService,
          useValue: {
            createGroup: jest.fn(),
            getGroupByID: jest.fn(),
            getGroupsByTournamentID: jest.fn(),
            updateGroup: jest.fn(),
            softDeleteGroup: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createGroup', () => {
    it('should call service.createGroup and return the result', async () => {
      const createGroupDto: CreateGroupDto = {
        name: 'group1',
        seeding: 1,
        tournamentId: 'tournament-id',
      };
      const group = { id: 'group-id', name: 'group1' };

      jest.spyOn(service, 'createGroup').mockResolvedValueOnce(group as any);

      const result = await controller.createGroup(createGroupDto);
      expect(result).toEqual(group);
      expect(service.createGroup).toHaveBeenCalledWith(createGroupDto);
    });
  });

  // Otras pruebas para las funciones getGroupByID, getGroupsByTournamentID, updateGroup, etc.
});
