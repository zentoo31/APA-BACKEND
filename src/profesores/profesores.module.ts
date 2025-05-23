import { Module } from '@nestjs/common';
import { ProfesoresController } from './profesores.controller';
import { ProfesoresService } from './profesores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './profesores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor])],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  exports: [ProfesoresService]
})
export class ProfesoresModule {}
