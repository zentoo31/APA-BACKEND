import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ambiente } from './ambiente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AmbienteService {
    constructor(@InjectRepository(Ambiente) private ambienteRepository: Repository<Ambiente>){}

    getAmbientes(){
        return this.ambienteRepository.find()
    }

    async getAmbiente(aula: string,idPabellon:string){
        const ambienteFound= await this.ambienteRepository.findOne({
            where:{
                idPabellon,
                aula
            }
        });

        if(!ambienteFound){
            return new HttpException('Ambiente not found',HttpStatus.NOT_FOUND)
        }
        return ambienteFound;
    }
}
