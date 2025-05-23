import { Controller, Get, Param } from '@nestjs/common';
import { CursoService } from './curso.service';
import { Curso } from './curso.entity';

@Controller('curso')
export class CursoController {
    constructor(
        private cursoService: CursoService,
    ){}

    @Get()
    getCursos():Promise<Curso[]>{
        return this.cursoService.getCursos();
    }

    @Get(':idCurso')
    getCurso(@Param('idCurso')idCurso: string){
        return this.cursoService.getCurso(idCurso);
    }
}

