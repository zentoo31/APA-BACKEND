import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(
        private usuariosService: UsuariosService,
    ) {}

    @Get()
    getUsuarios(): Promise<Usuario[]> {
        return this.usuariosService.getUsuarios();
    }

    @Post()
    createUsuarios(@Body() newUsuario: CreateUsuarioDto) {
        return this.usuariosService.createUsuario(newUsuario);
    }
    
    @Get(':IdPersonal')
    getUsuario(@Param('IdPersonal', ParseIntPipe) IdPersonal:number) {
        return this.usuariosService.getUsuario(IdPersonal);
    }
    
    @Delete(':id')
    deleteUsuario(@Param('id', ParseIntPipe) id:number) {
        return this.usuariosService.deleteUsuario(id);
    }

    @Patch(':IdPersonal')
    updateUsuario(@Param('IdPersonal', ParseIntPipe) idPersonal:number, @Body() usuario: UpdateUsuarioDto) {
        this.usuariosService.updateUsuario(idPersonal, usuario);
    }

    @Post('validar')
    async validarEmpleado(@Body() loginDto: LoginUsuarioDto): Promise<any> {
        try {
            const usuario = await this.usuariosService.validarDocente(loginDto.username, loginDto.password);
            if (!usuario) {
                throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
            }
            return { message: 'Autenticación exitosa' };
        } catch (error) {
            throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
        }
    }
}

