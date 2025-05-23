import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoCalificacion } from './tipocalificacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipocalificacionService {
    constructor(@InjectRepository(TipoCalificacion) private tipocaliRepository: Repository<TipoCalificacion>){}

    getTiposCali(){
        return this.tipocaliRepository.find();
    }

    async getTipoCali(idTipo:string){
        const tipoFound= await this.tipocaliRepository.findOne({
            where:{
                idTipo,
            }
        });

        if(!tipoFound){
            return new HttpException('Tipo no found',HttpStatus.NOT_FOUND);
        }
        
        return tipoFound;
    }
}
