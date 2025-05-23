import { Module } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidad } from './unidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidad])],
  providers: [UnidadService],
  controllers: [UnidadController],
  exports: [UnidadService]
})
export class UnidadModule {}
