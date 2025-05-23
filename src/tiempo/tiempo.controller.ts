import { Controller, Get, Param } from '@nestjs/common';
import { TiempoService } from './tiempo.service';
import { Tiempo } from './tiempo.entity';

@Controller('tiempo')
export class TiempoController {
    constructor(
        private tiemposService: TiempoService,
    ){}

    @Get()
    getTiempos():Promise<Tiempo[]>{
        return this.tiemposService.getTiempos();
    }

    @Get(':fechaInicio/:Turno')
    getTiempo(@Param('fechaInicio')fechaInicio:Date, @Param('Turno')Turno:string){
        this.tiemposService.getTiempo(fechaInicio,Turno);
    }
}
