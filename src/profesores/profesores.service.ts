import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './profesores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesoresService {

    constructor(@InjectRepository(Profesor)private profesorRespository: Repository<Profesor>){}

    getProfesores(){
        return this.profesorRespository.find()
    }

    async getProfesor(codigoD: number){
       const profesorFound = await this.profesorRespository.findOne({
          where:{
            codigoD,
          }
       });

       if(!profesorFound){
         return new HttpException('Profesor not found', HttpStatus.NOT_FOUND)
       }
       return profesorFound
    }


}
