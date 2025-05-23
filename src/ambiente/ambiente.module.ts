import { Module } from '@nestjs/common';
import { AmbienteController } from './ambiente.controller';
import { AmbienteService } from './ambiente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambiente } from './ambiente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ambiente])],
  controllers: [AmbienteController],
  providers: [AmbienteService],
  exports: [AmbienteService]
})
export class AmbienteModule {}
