import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tournament } from './entities/tournament.entity';
import { Group } from 'src/group/entities/group.entity';
import { Match } from 'src/match/entities/match.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tournament, Group, Match]),
  ],
  controllers: [TournamentController],
  providers: [TournamentService]
})
export class TournamentModule {}
