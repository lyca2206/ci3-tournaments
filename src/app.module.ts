import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TournamentModule } from './tournament/tournament.module';
import { MatchModule } from './match/match.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: ['dist/**/*.entity{.ts, .js}'],
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    UserModule, GroupModule, TournamentModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
