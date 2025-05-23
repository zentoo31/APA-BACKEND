import { Module } from '@nestjs/common';
import { TiempoController } from './tiempo.controller';
import { TiempoService } from './tiempo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tiempo } from './tiempo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tiempo])],
  controllers: [TiempoController],
  providers: [TiempoService],
  exports:[TiempoService]
})
export class TiempoModule {}
