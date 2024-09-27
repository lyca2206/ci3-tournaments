import { Module } from '@nestjs/common';
import { BracketController } from './bracket.controller';
import { BracketService } from './bracket.service';

@Module({
  controllers: [BracketController],
  providers: [BracketService]
})
export class BracketModule {}
