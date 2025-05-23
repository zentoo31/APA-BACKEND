import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante } from './estudiantes.entity';

@Controller('estudiantes')
export class EstudiantesController {
    constructor(
        private estudianteService: EstudiantesService,
    ){}

    @Get()
    getEstudiantes(): Promise<Estudiante[]>{
        return this.estudianteService.getEstudiantes();
    }

    @Get('cantidadPorGenero')
    async getCantidadEstudiantesPorGenero() {
        return this.estudianteService.getCantidadEstudiantesPorGenero();
    }

    @Get('cantidadTotal')
    async getCantidadTotalEstudiantes() {
        return this.estudianteService.getCantidadTotalEstudiantes();
    }

    @Get('clasificacionPromedio')
    async getClasificacion() {
        return this.estudianteService.getNotaPromedioClasificdo();
    }

    @Get('estudiantesEstado')
    async contarEstudiantesEstadoCivil(){
         return this.estudianteService.contarEstudiantesPorEstadoCivil();
    }

    @Get('estudiantesDistritos')
    async estudianteDistrito(){
        return this.estudianteService.getEstudiantesDistritos();
    }

    @Get('totalConoNorte')
    async totalConoNorte(){
        return this.estudianteService.getTotalConoNorte();
    }
    @Get(':CodigoE')
    getEstudiante(@Param('CodigoE',ParseIntPipe) CodigoE: number){
        return this.estudianteService.getEstudiante(CodigoE);
    }


}
