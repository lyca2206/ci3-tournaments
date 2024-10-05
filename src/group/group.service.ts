import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private readonly groupRepository: Repository<Group>
    ) {}

    async createGroup() {
        throw new NotImplementedException
    }

    async getGroupByID() {
        throw new NotImplementedException
    }

    async getGroupsByTournamentID() {
        throw new NotImplementedException
    }

    async updateGroup() {
        throw new NotImplementedException
    }

    async softDeleteGroup() {
        throw new NotImplementedException
    }
}
