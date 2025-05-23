import { Controller, Get, Param } from '@nestjs/common';
import { TipocalificacionService } from './tipocalificacion.service';
import { TipoCalificacion } from './tipocalificacion.entity';

@Controller('tipocalificacion')
export class TipocalificacionController {
    constructor(
        private tiposService: TipocalificacionService,
    ){}

    @Get()
    getTiposCali():Promise<TipoCalificacion[]>{
        return this.tiposService.getTiposCali();
    }

    @Get(':idTipo')
    getTipoCali(@Param('idTipo')idTipo: string){
        return this.tiposService.getTipoCali(idTipo);
    }
}
