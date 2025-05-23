import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipo } from './tipo.entity';
import { Repository } from 'typeorm';
import { CreateTipoDto } from './dto/create-tipo.dto';

@Injectable()
export class TipoService {

    constructor(@InjectRepository(Tipo) private tipoRepository: Repository<Tipo>){}

    async createTipo(tipo: CreateTipoDto){
        const tipoFound= await this.tipoRepository.findOne({
            where:{
                idTipo: tipo.idTipo
            }
        })

        if(tipoFound){
           return new HttpException('Tipo already exits', HttpStatus.CONFLICT)
        }

        const newTipo= this.tipoRepository.create(tipo)
        return this.tipoRepository.save(newTipo)
    }

    getTipos(){
        return this.tipoRepository.find()
    }

    async getTipo(idTipo: number){
        const tipoFound= await this.tipoRepository.findOne({
            where:{
                idTipo
            }
        });

        if(!tipoFound){
           return new HttpException('Tipo not found', HttpStatus.NOT_FOUND);
        }
        return tipoFound;
    }

    async deleteTipo(idTipo: number){
        const result= await this.tipoRepository.delete({idTipo});
        if(result.affected===0){
            return new HttpException('Tipo not Found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

}
