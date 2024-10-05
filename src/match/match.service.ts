import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match) private readonly matchRepository: Repository<Match>
    ) {}

    async createMatch() {
        throw new NotImplementedException
    }
    
    async getMatchByID() {
        throw new NotImplementedException
    }

    async getMatchByTournamentID() {
        throw new NotImplementedException
    }

    async updateMatch() {
        throw new NotImplementedException
    }

    async softDeleteMatch() {
        throw new NotImplementedException
    }
}
