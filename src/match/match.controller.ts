import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getMatchByID(@Param('id') id: string) {
    return this.matchService.getMatchByID(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getByTournamentID/:id')
  getMatchByTournamentID(@Param('id') id: string) {
    return this.matchService.getMatchByTournamentID(id);
  }
}
