import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './carrera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarreraService {
    constructor(@InjectRepository(Carrera)private carreraRepository: Repository<Carrera>){}
     
    getCarreras(){
        return this.carreraRepository.find()
    }

    async getCarrera(idCarrera: number){
        const carreraFound= await this.carreraRepository.findOne({
            where:{
                idCarrera,
            }
        });

        if(!carreraFound){
            return new HttpException('Carrera not found',HttpStatus.NOT_FOUND)
        }
        return carreraFound
    }
}
