import { Module } from '@nestjs/common';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './personal.entity';
import { EstadocivilModule } from 'src/estadocivil/estadocivil.module';
import { DistritoModule } from 'src/distrito/distrito.module';
import { GeneroModule } from 'src/genero/genero.module';
import { TipoModule } from 'src/tipo/tipo.module';

@Module({
  imports:[TypeOrmModule.forFeature([Personal]),EstadocivilModule,DistritoModule,GeneroModule,TipoModule],
  controllers: [PersonalController],
  providers: [PersonalService],
  exports:[PersonalService]
})
export class PersonalModule {}
