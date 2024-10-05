import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Group } from './entities/group.entity';
import { Match } from 'src/match/entities/match.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tournament, Group, Match]),
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
