import { Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './DTO/create_user.dto';
import { UserDTO } from './DTO/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async createUser(createUserDTO: CreateUserDTO) {
        try {
            const {username, password} = createUserDTO

            const user = this.userRepository.create({
                username,
                password: bcrypt.hashSync(password, 10)
            })
            await this.userRepository.save(user)

            return user
        } catch (e) { console.log(e) }
    }

    async authenticate(userDTO: UserDTO) {
        try {
            const {username, password} = userDTO

            const user = await this.userRepository.findOne(
                {
                    where: { username },
                    select: { id: true, username: true, password: true }
                }
            )
            
            if (!user || !bcrypt.compareSync(password, user.password)) {
                throw new UnauthorizedException('Invalid credentials.')
            }

            return {...user, token: this.jwtService.sign({ id: user.id, username: user.username })}
        } catch (e) { console.log(e) }
    }

    async getUserByID(id: string) {
        throw new NotImplementedException
    }
    async updateUser(id: string, userDTO: UserDTO) {
        throw new NotImplementedException
    }

    async softDeleteUser(id: string) {
        throw new NotImplementedException
    }
}
