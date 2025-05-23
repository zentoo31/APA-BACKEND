import { Module } from '@nestjs/common';
import { TipocalificacionService } from './tipocalificacion.service';
import { TipocalificacionController } from './tipocalificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCalificacion } from './tipocalificacion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TipoCalificacion])],
  providers: [TipocalificacionService],
  controllers: [TipocalificacionController],
  exports:[TipocalificacionService]
})
export class TipocalificacionModule {}
