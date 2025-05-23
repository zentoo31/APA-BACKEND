import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { Carrera } from './carrera.entity';

@Controller('carrera')
export class CarreraController {
    constructor(
        private carrerasService: CarreraService,
    ){}

    @Get()
    getCarreras(): Promise<Carrera[]>{
        return this.carrerasService.getCarreras();
    }

    @Get(':idCarrera')
    getCarrera(@Param('idCarrera',ParseIntPipe) idCarrera: number){
        return this.carrerasService.getCarrera(idCarrera);
    }

}
