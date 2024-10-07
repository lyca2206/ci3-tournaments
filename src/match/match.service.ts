import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match) private readonly matchRepository: Repository<Match>,
        private readonly jwtService: JwtService
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
