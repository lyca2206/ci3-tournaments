import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tournament } from './entities/tournament.entity';
import { Group } from 'src/group/entities/group.entity';
import { Match } from 'src/match/entities/match.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MatchService } from 'src/match/match.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Tournament, Group, Match]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: configService.get("JWT_EXPIRATION") }
      })
    })
  ],
  controllers: [TournamentController],
  providers: [TournamentService, MatchService]
})
export class TournamentModule {}
