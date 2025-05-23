import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tiempo } from './tiempo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiempoService {
    constructor(@InjectRepository(Tiempo)private tiempoRepository: Repository<Tiempo>){}

    getTiempos(){
        return this.tiempoRepository.find();
    }

    async getTiempo(fechaInicio:Date, Turno:string){
      const tiempoFound= await this.tiempoRepository.findOne({
           where:{
              fechaInicio,
              Turno,
           }
      });

      if(!tiempoFound){
        return new HttpException('Tiempo not found', HttpStatus.NOT_FOUND);
      }
      return tiempoFound;
    }
}
