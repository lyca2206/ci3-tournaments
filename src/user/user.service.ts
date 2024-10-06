import { BadRequestException, Injectable, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
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

            return {...user, password: "You should memorize it!"}
        } catch (e) {
            if (e.code === "23505") { throw new BadRequestException("The given username already exists.") }
            else { throw e }
        }
    }

    async authenticate(userDTO: UserDTO) {
        const { username, password } = userDTO
        const user = await this.findOneByUsername(username, true)

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials.')
        }

        return {...user, token: this.jwtService.sign({ id: user.id, username: user.username })}
    }

    async getUserByID(id: string) {
        try {
            const user = await this.findOneByID(id, false)
            if (!user) { throw new NotFoundException }
            return user
        } catch (e) {
            if (e.code === "22P02") { throw new BadRequestException("The given ID isn't valid.") }
            else { throw e }
        }
    }

    async updateUser(id: string, userDTO: UserDTO) {
        try {
            let { username, password } = userDTO
            const user = await this.findOneByID(id, true)
            if (!user) { throw new NotFoundException }

            username = username !== "" ? username : user.username
            password = password !== "" ? password : user.password

            await this.userRepository.update({ id }, {
                username: username,
                password: bcrypt.hashSync(password, 10)
            })

            return { id, username }
        } catch (e) {
            if (e.code === "23505") { throw new BadRequestException("The given username already exists.") }
            else { throw e }
        }
    }

    async softDeleteUser(id: string) {
        const user = await this.findOneByID(id, false)
        if (!user) { throw new NotFoundException }

        this.userRepository.softDelete({ id })

        return user
    }

    private async findOneByUsername(username: string, isReturningPassword: boolean) {
        const user = await this.userRepository.findOne({
            where: { username },
            select: { id: true, username: true, password: isReturningPassword }
        })
        return user
    }

    private async findOneByID(id: string, isReturningPassword: boolean) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: { id: true, username: true, password: isReturningPassword }
        })
        return user
    }
}
