import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException,NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';


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
                        findOne: jest.fn(), // Use findOne instead of findOneByID
                        clear: jest.fn(),
                        update: jest.fn(),
                        softDelete: jest.fn(),
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
});
