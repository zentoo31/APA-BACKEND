import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './carrera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera])],
  providers: [CarreraService],
  controllers: [CarreraController],
  exports:[CarreraService]
})
export class CarreraModule {}
