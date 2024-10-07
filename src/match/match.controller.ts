import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('match')
export class MatchController {
    constructor(
        private readonly matchService: MatchService
    ){}
    @UseGuards(AuthGuard('jwt'))
    @Get("/:id")
    getMatchByID() {
        return this.matchService.getMatchByID()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/getByTournamentID/:id")
    getMatchByTournamentID(@Param("id") id: string) {
        return this.matchService.getMatchByTournamentID(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/:id")
    updateMatch() {
        return this.matchService.updateMatch()
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:id")
    softDeleteMatch() {
        return this.matchService.softDeleteMatch()
    }
}
