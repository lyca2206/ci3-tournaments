import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('match')
export class MatchController {
    constructor(
        private readonly matchService: MatchService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/create")
    createMatch() { return this.matchService.createMatch() }
    
    @Get("/:id")
    getMatchByID() { return this.matchService.getMatchByID() }

    @Get("/getByTournamentID/:id")
    getMatchByTournamentID() { return this.matchService.getMatchByTournamentID() }

    @Put("/:id")
    updateMatch() { return this.matchService.updateMatch() }

    @Delete("/:id")
    softDeleteMatch() { return this.matchService.softDeleteMatch() }
}
