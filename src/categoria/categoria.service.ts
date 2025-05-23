import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {

    constructor(@InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>){}

    getCategorias(){
        return this.categoriaRepository.find()
    }

    async getCategoria(idCategoriaE: string){
        const categoriaFound= await this.categoriaRepository.findOne({
            where:{
                idCategoriaE,
            }
        });

        if(!categoriaFound){
            return new HttpException('Categoria not found',HttpStatus.NOT_FOUND)
        }
        return categoriaFound
    }
}
