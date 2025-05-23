import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CursoService {

    constructor(@InjectRepository(Curso) private cursoRepository: Repository<Curso>){}

    getCursos(){
        return this.cursoRepository.find();
    }

    async getCurso(idCurso: string){
        const cursoFound= await this.cursoRepository.findOne({
            where:{
                idCurso,
            }
        });

        if(!cursoFound){
            return new HttpException('Curso not found',HttpStatus.NOT_FOUND);
        }
        return cursoFound;
    }
}
