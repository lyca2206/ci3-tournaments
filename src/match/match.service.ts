import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
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

    async createMatch(tournamentID: string, nextMatchID: string) {
        let match = this.matchRepository.create(
            nextMatchID !== "" ?
            { tournament: { id: tournamentID }, next: { id: nextMatchID } } :
            { tournament: { id: tournamentID } }
        )
        match = await this.matchRepository.save(match)

        return match.id
    }
    
    async getMatchByID() {
        throw new NotImplementedException
    }

    async getMatchByTournamentID(id: string) {
        try {
            const match = await this.matchRepository.find({ where: { tournament: { id } } })
            if (!match) { throw new NotFoundException }
    
            return match
        } catch (e) { this.handleException(e) }
    }

    async updateMatch() {
        throw new NotImplementedException
    }

    async softDeleteMatch() {
        throw new NotImplementedException
    }

    private handleException(e: any) {
        if (e.code === "22P02") { throw new BadRequestException("The given ID isn't valid.") }
        else { throw e }
    }
}
