import { Controller,
        Post,
        Body,
        Get,
        Param,
        Delete,
        ParseIntPipe
 } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { Tipo } from './tipo.entity';
import { CreateTipoDto } from './dto/create-tipo.dto';

@Controller('tipo')
export class TipoController {
    constructor(private tipoService: TipoService){}

    @Get()
    getTipos(): Promise<Tipo[]>{
        return this.tipoService.getTipos();
    }

    @Post()
    createTipos(@Body() newTipo: CreateTipoDto){
        return this.tipoService.createTipo(newTipo);
    }

    @Get(':id')
    getTipo(@Param('id',ParseIntPipe) id:number){
        return this.tipoService.getTipo(id);
    }

    @Delete(':id')
    deleteTipo(@Param('id',ParseIntPipe) id:number){
        return this.tipoService.deleteTipo(id);
    }
}
