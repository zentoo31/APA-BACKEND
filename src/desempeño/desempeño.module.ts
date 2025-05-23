import { Module } from '@nestjs/common';
import { DesempeñoService } from './desempeño.service';
import { DesempeñoController } from './desempeño.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desempeño } from './desempeño.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Desempeño])],
  providers: [DesempeñoService],
  controllers: [DesempeñoController],
  exports:[DesempeñoService]
})
export class DesempeñoModule {}
