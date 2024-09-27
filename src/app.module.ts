import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TournamentModule } from './tournament/tournament.module';
import { BracketModule } from './bracket/bracket.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [UserModule, GroupModule, TournamentModule, BracketModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
