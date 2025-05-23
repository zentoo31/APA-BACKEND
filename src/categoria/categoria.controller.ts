import { Controller, Get, Param } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@Controller('categoria')
export class CategoriaController {
    constructor(
        private categoriaService: CategoriaService,
    ){}

    @Get()
    getCategorias(): Promise<Categoria[]>{
        return this.categoriaService.getCategorias();
    }

    @Get(':idCategoriaE')
    getCategoria(@Param('idCategoriaE') idCategoriaE:string){
        return this.categoriaService.getCategoria(idCategoriaE);
    }
}
