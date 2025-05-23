import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './curso.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Curso])],
  controllers: [CursoController],
  providers: [CursoService],
  exports:[CursoService]
})
export class CursoModule {}
