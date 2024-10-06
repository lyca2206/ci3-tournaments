import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { TournamentDTO } from './DTO/tournament.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>,
        private readonly jwtService: JwtService
    ) {}

    async createTournament(auth: string, tournamentDTO: TournamentDTO) {
        const payload: any = this.jwtService.decode(auth.split(" ")[1])
        const tournament = this.tournamentRepository.create({...tournamentDTO, creator: payload.id})
        await this.tournamentRepository.save(tournament)

        return { ... tournamentDTO, creator: payload.id }
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
