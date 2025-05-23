import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from './personal.entity';
import { Repository } from 'typeorm';
import { EstadocivilService } from 'src/estadocivil/estadocivil.service';
import { GeneroService } from 'src/genero/genero.service';
import { DistritoService } from 'src/distrito/distrito.service';
import { TipoService } from 'src/tipo/tipo.service';
import { CreatePersonalDto } from './dto/create-personal.dto';

@Injectable()
export class PersonalService {
    constructor(@InjectRepository(Personal) 
    private personalRepository: Repository<Personal>,
    private estadocivilService: EstadocivilService,
    private generoService: GeneroService,
    private distritoServce: DistritoService,
    private tipoService: TipoService){}
    
    async createPersonal(personal: CreatePersonalDto){
        
        const personalFound= await this.personalRepository.findOne({
            where:{
                idPersonal: personal.idPersonal
            }
        })
        if(personalFound){
            return new HttpException('Personal already exists',HttpStatus.CONFLICT)
        }

        const estadoFound= await this.estadocivilService.getEstado(personal.idEstado,);
        const generoFound= await this.generoService.getGenero(personal.idGenero);
        const distritoFound= await this.distritoServce.getDistrito(personal.idDistrito);
        const tipoFound= await this.tipoService.getTipo(personal.idTipo);

        if(!estadoFound && !generoFound && ! distritoFound && ! tipoFound){
            return new HttpException(
                'Faltan datos (idEstadoCivil, idGenero, idDistrito, idTipo)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newPersonal= this.personalRepository.create(personal)
        return this.personalRepository.save(newPersonal)
    }

    getPersonales(){
        return this.personalRepository.find({
            relations:['estadocivil','genero','distrito','tipo'],
        });
    }

    async getPersonal(idPersonal: number){
        const personalFound = await this.personalRepository.findOne({
            where:{
                idPersonal
            }
        });

        if(!personalFound){
            return new HttpException('Personal not found',HttpStatus.NOT_FOUND)
        }
        return personalFound;
    }

    async deletePersonal(idPersonal: number){
        const result= await this.personalRepository.delete({idPersonal});
        if(result.affected === 0){
            return new HttpException('Personal not found', HttpStatus.NOT_FOUND);
        }
        return result;
        }

}
