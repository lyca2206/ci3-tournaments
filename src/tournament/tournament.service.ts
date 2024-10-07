import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
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

    async getTournamentByID(id: string) {
        try {
            const tournament = await this.tournamentRepository.findOne({ where: { id } })
            if (!tournament) { throw new NotFoundException }
    
            return tournament
        } catch (e) { this.handleException(e) }
    }

    async getTournamentsByCreator(id: string) {
        try {
            const tournament = await this.tournamentRepository.find({ where: { creator: { id } } })
            if (!tournament) { throw new NotFoundException }
    
            return tournament
        } catch (e) { this.handleException(e) }
    }

    async getAllTournaments() {
        return this.tournamentRepository.find()
    }

    async initializeSingleEliminationTournament() {
        throw new NotImplementedException
    }

    async initializeRoundRobinTournament() {
        throw new NotImplementedException
    }

    async updateTournament(id: string, tournamentDTO: TournamentDTO) {
        try {
            const tournament = await this.tournamentRepository.findOne({ where: { id } })
            if (!tournament) { throw new NotFoundException }
    
            await this.tournamentRepository.update({ id }, tournamentDTO)

            return { id, ...tournamentDTO }
        } catch (e) { this.handleException(e) }
    }

    async softDeleteTournament(id: string) {
        const tournament = await this.tournamentRepository.findOne({ where: { id } })
        if (!tournament) { throw new NotFoundException }

        this.tournamentRepository.softDelete({ id })
        
        return tournament
    }

    private handleException(e: any) {
        if (e.code === "22P02") { throw new BadRequestException("The given ID isn't valid.") }
        else { throw e }
    }
}
