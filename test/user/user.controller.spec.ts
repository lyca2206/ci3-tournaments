import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { CreateUserDTO } from '../../src/user/DTO/create_user.dto';
import { UserDTO } from '../../src/user/DTO/user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    createUser: jest.fn((dto: CreateUserDTO) => ({
      id: '1',
      ...dto,
    })),
    authenticate: jest.fn((dto: UserDTO) => ({
      id: '1',
      ...dto,
      token: 'some.jwt.token',
    })),
    getUserByID: jest.fn((id: string) => ({
      id,
      username: 'testuser',
    })),
    updateUser: jest.fn((id: string, dto: UserDTO) => ({
      id,
      ...dto,
    })),
    softDeleteUser: jest.fn((id: string) => ({
      id,
      username: 'testuser',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const createUserDTO: CreateUserDTO = {
      username: 'testuser',
      password: 'password123',
    };
    expect(await userController.createUser(createUserDTO)).toEqual({
      id: '1',
      ...createUserDTO,
    });
  });

  it('should authenticate a user', async () => {
    const userDTO: UserDTO = { username: 'testuser', password: 'password123' };
    expect(await userController.authenticate(userDTO)).toEqual({
      id: '1',
      ...userDTO,
      token: 'some.jwt.token',
    });
  });

  it('should get user by ID', async () => {
    expect(await userController.getUserByID('1')).toEqual({
      id: '1',
      username: 'testuser',
    });
  });

  it('should update a user', async () => {
    const userDTO: UserDTO = {
      username: 'updateduser',
      password: 'newpassword123',
    };
    expect(await userController.updateUser('1', userDTO)).toEqual({
      id: '1',
      ...userDTO,
    });
  });

  it('should soft delete a user', async () => {
    expect(await userController.softDeleteUser('1')).toEqual({
      id: '1',
      username: 'testuser',
    });
  });
});
