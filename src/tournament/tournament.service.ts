import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>
    ) {}

    async createTournament() {
        throw new NotImplementedException
    }

    async getTournamentByID() {
        throw new NotImplementedException
    }

    async getTournamentsByCreator() {
        throw new NotImplementedException
    }

    async getAllTournaments() {
        throw new NotImplementedException
    }

    async initializeSingleEliminationTournament() {
        throw new NotImplementedException
    }

    async initializeRoundRobinTournament() {
        throw new NotImplementedException
    }

    async updateTournament() {
        throw new NotImplementedException
    }

    async softDeleteTournament() {
        throw new NotImplementedException
    }
}
