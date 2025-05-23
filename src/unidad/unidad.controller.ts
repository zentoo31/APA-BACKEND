import { Controller, Get, Param } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { Unidad } from './unidad.entity';

@Controller('unidad')
export class UnidadController {
    constructor(private unidadesService: UnidadService,){}

    @Get()
    getUnidades(): Promise<Unidad[]>{
        return this.unidadesService.getUnidades();
    }

    @Get(':idUnidad')
    getUnidad(@Param('idUnidad')idUnidad: string){
        return this.unidadesService.getUnidad(idUnidad);
    }

}
