import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { Personal } from './personal.entity';
import { CreatePersonalDto } from './dto/create-personal.dto';

@Controller('personal')
export class PersonalController {
    
    constructor(private personalService: PersonalService){}

    @Get()
    getPersonales(): Promise<Personal[]>{
        return this.personalService.getPersonales();
    }

    @Post()
    createPersonal( @Body() newPersonal: CreatePersonalDto){
        return this.personalService.createPersonal(newPersonal);
    }
    
    @Get(':id')
    getPersonal(@Param('id', ParseIntPipe) id:number){
        return this.personalService.getPersonal(id);
    }
    
    @Delete(':id')
    deletePersonal(@Param('id', ParseIntPipe) id:number){
        return this.personalService.getPersonal(id);
    }
}
