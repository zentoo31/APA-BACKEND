import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidad } from './unidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnidadService {
    constructor(@InjectRepository(Unidad) private unidadRepository: Repository<Unidad>){}

    getUnidades(){
        return this.unidadRepository.find()
    }

    async getUnidad(idUnidad: string){
        const unidadFound = await this.unidadRepository.findOne({
            where:{
                idUnidad,
            }
        });

        if(!unidadFound){
            return new HttpException('Unidad not found',HttpStatus.NOT_FOUND)
        };
        return unidadFound;
    }
}
