import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Group } from 'src/group/entities/group.entity';
import { Match } from './entities/match.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tournament, Group, Match]),
  ],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
