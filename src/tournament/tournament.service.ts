import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { TournamentDTO } from './DTO/tournament.dto';
import { JwtService } from '@nestjs/jwt';
import { MatchService } from 'src/match/match.service';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class TournamentService {
    constructor(
        private readonly matchService: MatchService,
        private readonly groupService: GroupService,
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

    async initializeSingleEliminationTournament(id: string) {
        const count = await this.groupService.getGroupCount(id)
        this.initializeSETStep(id, 1, 1, "", count)
    }

    private async initializeSETStep(tournamentID: string, seed: number, round: number, nextMatchID: string, attendees: number) {
        const opponentSeed = (Math.pow(2, round)) + 1 - seed
        if (opponentSeed > attendees) {
            const group = await this.groupService.getGroupBySeed(tournamentID, seed)
            this.matchService.addGroup(nextMatchID, group)
        }
        else {
            const createdMatchID = await this.matchService.createMatch(tournamentID, nextMatchID)
            this.initializeSETStep(tournamentID, seed, round + 1, createdMatchID, attendees)
            this.initializeSETStep(tournamentID, opponentSeed, round + 1, createdMatchID, attendees)
        }
    }

    async initializeRoundRobinTournament(id: string) {
        //TODO. It inherently depends on Group, hence why I need to wait until that module is done.
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
