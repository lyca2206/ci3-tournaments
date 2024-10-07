import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException,NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        clear: jest.fn(),
                        update: jest.fn(), // Mock for update method
                        softDelete: jest.fn(), // Mock for softDelete method
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should create a new user if it doesn’t exist', async () => {
        const newUser = { username: 'testuser', password: 'testpass' };
        
        // Simulate that the user does not exist
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
        
        // Simulate 'create' and 'save'
        jest.spyOn(userRepository, 'create').mockReturnValue(newUser as User);
        jest.spyOn(userRepository, 'save').mockResolvedValue(newUser as User);

        const result = await service.createUser(newUser);
        expect(result).toEqual({ ...newUser, password: 'You should memorize it!' });
        expect(userRepository.create).toHaveBeenCalledWith({
            username: newUser.username,
            password: expect.any(String),  // Expecting the hashed password
        });
        expect(userRepository.save).toHaveBeenCalledWith(newUser);
    });

    it('should throw an exception if the user already exists', async () => {
        const existingUser = { username: 'testuser', password: 'testpass' };

        // Simulate that the user already exists
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser as User);
        
        await expect(service.createUser(existingUser)).rejects.toThrow(BadRequestException);
    });

    it('should update a user if the user exists', async () => {
        const id = 'some-uuid';
        const updatedUserData = { username: 'updatedUser', password: 'newPassword' };
        
        const existingUser = { id, username: 'oldUser', password: 'oldPassword' };
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser as User);
        
        // Mocking the update method to return a mocked UpdateResult
        const mockUpdateResult: UpdateResult = { generatedMaps: [], raw: {}, affected: 1 };
        jest.spyOn(userRepository, 'update').mockResolvedValue(mockUpdateResult);
        
        const result = await service.updateUser(id, updatedUserData);
        
        expect(result).toEqual({ id, username: 'updatedUser' });
        expect(userRepository.update).toHaveBeenCalledWith({ id }, {
            username: updatedUserData.username,
            password: expect.any(String),  // Expecting the hashed password
        });
    });

    it('should throw NotFoundException if the user does not exist', async () => {
        const id = 'some-uuid';
        const updatedUserData = { username: 'updatedUser', password: 'newPassword' };

        // Simulating that the user does not exist
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
        
        await expect(service.updateUser(id, updatedUserData)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if the user does not exist for soft delete', async () => {
        const id = 'some-uuid';

        // Simulating that the user does not exist
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
        
        await expect(service.softDeleteUser(id)).rejects.toThrow(NotFoundException);
    });
});
