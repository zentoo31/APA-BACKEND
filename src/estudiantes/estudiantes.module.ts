import { Module } from '@nestjs/common';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './estudiantes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports:[EstudiantesService]
})
export class EstudiantesModule {}
