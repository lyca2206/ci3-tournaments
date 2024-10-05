import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TournamentService } from './tournament.service';

@Controller('tournament')
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/create")
    createTournament() { return this.tournamentService.createTournament() }

    @UseGuards(AuthGuard('jwt'))
    @Get("/:id")
    getTournamentByID() { return this.tournamentService.getTournamentByID() }

    @UseGuards(AuthGuard('jwt'))
    @Get("/getByCreator/:id")
    getTournamentsByCreator() { return this.tournamentService.getTournamentsByCreator() }

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
    updateTournament() { return this.tournamentService.updateTournament() }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:id")
    softDeleteTournament() { return this.tournamentService.softDeleteTournament() }
}
