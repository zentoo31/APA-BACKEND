import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { Profesor } from './profesores.entity';

@Controller('profesores')
export class ProfesoresController {

    constructor(
        private profesorService: ProfesoresService,
    ){}

    @Get()
    getProfesores():Promise<Profesor[]>{
        return this.profesorService.getProfesores();
    }

    @Get('codigoD')
    getProfesor(@Param('codigoD',ParseIntPipe)codigoD: number){
        return this.profesorService.getProfesor(codigoD);
    }

}
