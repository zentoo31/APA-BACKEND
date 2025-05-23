import { Controller, Get, Param } from '@nestjs/common';
import { AmbienteService } from './ambiente.service';
import { Ambiente } from './ambiente.entity';

@Controller('ambiente')
export class AmbienteController {
    constructor(
        private ambienteService: AmbienteService,
    ){}

    @Get()
    getAmbientes():Promise<Ambiente[]>{
        return this.ambienteService.getAmbientes();
    }

    @Get(':idPabellon/:aula')
    getAmbiente(@Param('idPabellon')idPabellon: string,@Param('aula')aula:string){
        return this.ambienteService.getAmbiente(aula,idPabellon);
    }

}
