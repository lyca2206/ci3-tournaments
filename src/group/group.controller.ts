import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateGroupDto } from './DTO/create_group.dto';
import { UpdateGroupDto } from './DTO/update_group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getGroupByID(@Param('id') id: string) {
    return this.groupService.getGroupByID(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getByTournamentID/:id')
  getGroupsByTournamentID(@Param('id') tournamentId: string) {
    return this.groupService.getGroupsByTournamentID(tournamentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updateGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  softDeleteGroup(@Param('id') id: string) {
    return this.groupService.softDeleteGroup(id);
  }
}
