import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from 'src/group/group.controller';
import { GroupService } from 'src/group/group.service';
import { CreateGroupDto } from 'src/group/DTO/create_group.dto';
import { UpdateGroupDto } from 'src/group/DTO/update_group.dto';
import { NotFoundException } from '@nestjs/common';

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

  describe('getGroupByID', () => {
    it('should return a group by ID', async () => {
      const groupId = 'group-id';
      const group = { id: groupId, name: 'group1', seeding: 1 };

      jest.spyOn(service, 'getGroupByID').mockResolvedValueOnce(group as any);

      const result = await controller.getGroupByID(groupId);
      expect(result).toEqual(group);
      expect(service.getGroupByID).toHaveBeenCalledWith(groupId);
    });

    it('should throw NotFoundException if group is not found', async () => {
      const groupId = 'non-existing-id';
      jest
        .spyOn(service, 'getGroupByID')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(controller.getGroupByID(groupId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getGroupsByTournamentID', () => {
    it('should return an array of groups by tournament ID', async () => {
      const tournamentId = 'tournament-id';
      const mockGroups = [
        { id: 'group1-id', name: 'group1', seeding: 1 },
        { id: 'group2-id', name: 'group2', seeding: 2 },
      ];

      jest
        .spyOn(service, 'getGroupsByTournamentID')
        .mockResolvedValueOnce(mockGroups as any);

      const result = await controller.getGroupsByTournamentID(tournamentId);
      expect(result).toEqual(mockGroups);
      expect(service.getGroupsByTournamentID).toHaveBeenCalledWith(
        tournamentId,
      );
    });
  });

  describe('updateGroup', () => {
    it('should call service.updateGroup and return the updated group', async () => {
      const groupId = 'group-id';
      const updateGroupDto: UpdateGroupDto = {
        name: 'updated-group',
        seeding: 2,
      };
      const updatedGroup = { id: groupId, ...updateGroupDto };

      jest
        .spyOn(service, 'updateGroup')
        .mockResolvedValueOnce(updatedGroup as any);

      const result = await controller.updateGroup(groupId, updateGroupDto);
      expect(result).toEqual(updatedGroup);
      expect(service.updateGroup).toHaveBeenCalledWith(groupId, updateGroupDto);
    });

    it('should throw NotFoundException if group is not found', async () => {
      const groupId = 'non-existing-id';
      const updateGroupDto: UpdateGroupDto = {
        name: 'updated-group',
        seeding: 2,
      };

      jest
        .spyOn(service, 'updateGroup')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        controller.updateGroup(groupId, updateGroupDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDeleteGroup', () => {
    it('should call service.softDeleteGroup and return the deleted group', async () => {
      const groupId = 'group-id';
      const deletedGroup = {
        id: groupId,
        name: 'group1',
        deletedAt: new Date(),
      };

      jest
        .spyOn(service, 'softDeleteGroup')
        .mockResolvedValueOnce(deletedGroup as any);

      const result = await controller.softDeleteGroup(groupId);
      expect(result).toEqual(deletedGroup);
      expect(service.softDeleteGroup).toHaveBeenCalledWith(groupId);
    });

    it('should throw NotFoundException if group is not found for deletion', async () => {
      const groupId = 'non-existing-id';

      jest
        .spyOn(service, 'softDeleteGroup')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(controller.softDeleteGroup(groupId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
