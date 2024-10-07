import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/create")
    createGroup() {
        return this.groupService.createGroup()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/:id")
    getGroupByID() {
        return this.groupService.getGroupByID()
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get("/getByTournamentID/:id")
    getGroupsByTournamentID() {
        return this.groupService.getGroupsByTournamentID()
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/:id")
    updateGroup() {
        return this.groupService.updateGroup()
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:id")
    softDeleteGroup() {
        return this.groupService.softDeleteGroup()
    }
}
