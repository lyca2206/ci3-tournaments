import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TournamentService } from './tournament.service';
import { TournamentDTO } from './DTO/tournament.dto';

@Controller('tournament')
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/create")
    createTournament(@Headers("authorization") auth: string, @Body() tournamentDTO: TournamentDTO) {
        return this.tournamentService.createTournament(auth, tournamentDTO)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/:id")
    getTournamentByID(@Param("id") id: string) {
        return this.tournamentService.getTournamentByID(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/getByCreator/:id")
    getTournamentsByCreator(@Param("id") id: string) {
        return this.tournamentService.getTournamentsByCreator(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/")
    getAllTournaments() { return this.tournamentService.getAllTournaments() }

    @UseGuards(AuthGuard('jwt'))
    @Post("/initSingleElimination/:id")
    initializeSingleEliminationTournament() { return this.tournamentService.initializeSingleEliminationTournament() }

    @UseGuards(AuthGuard('jwt'))
    @Post("/initRoundRobin/:id")
    initializeRoundRobinTournament() { return this.tournamentService.initializeSingleEliminationTournament() }

    @UseGuards(AuthGuard('jwt'))
    @Put("/:id")
    updateTournament(@Param("id") id: string, @Body() tournamentDTO: TournamentDTO) {
        return this.tournamentService.updateTournament(id, tournamentDTO)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:id")
    softDeleteTournament() { return this.tournamentService.softDeleteTournament() }
}
