import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create_user.dto';
import { UserDTO } from './DTO/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    
    @Post("/signup")
    createUser(@Body() createUserDTO: CreateUserDTO) { return this.userService.createUser(createUserDTO) }

    @Post("signin")
    authenticate(@Body() userDTO: UserDTO) { return this.userService.authenticate(userDTO) }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getUserByID(id: string) { this.userService.getUserByID(id) }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateUser(id: string, @Body() userDTO: UserDTO) { return this.userService.updateUser(id, userDTO) }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    softDeleteUser(id: string) { return this.userService.softDeleteUser(id) }
}
