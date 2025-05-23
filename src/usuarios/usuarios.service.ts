import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {

    //CREAR USUARIO
    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>){}
    
    async createUsuario(usuario: CreateUsuarioDto){
       const usuarioFound= await this.usuarioRepository.findOne({
            where:{
                username: usuario.username
            }
        })

        if(usuarioFound){
           return new HttpException('User already exists',HttpStatus.CONFLICT)
        }

        const newUsuario= this.usuarioRepository.create(usuario)
        return this.usuarioRepository.save(newUsuario)
    }

    getUsuarios(){
        return this.usuarioRepository.find()
    }

   async getUsuario(IdPersonal: number){
        const usuarioFound = await this.usuarioRepository.findOne({
            where:{
                IdPersonal,
            }
        });

        if(!usuarioFound){
            return new HttpException('User not found',HttpStatus.NOT_FOUND)
        }
        return usuarioFound
    }

    async deleteUsuario(id: number){
       const result= await this.usuarioRepository.delete({id});
       if(result.affected === 0){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
       }
       return result;
    }

    async updateUsuario(IdPersonal: number, usuario: UpdateUsuarioDto ){
        const usuarioFound= await this.usuarioRepository.findOne({
            where: {
                IdPersonal,
            }
        })

        if(!usuarioFound){
           return new HttpException('User not found',HttpStatus.NOT_FOUND);
        }

        const updateUsuario= Object.assign(usuarioFound, usuario);
        return this.usuarioRepository.save(updateUsuario);
    }
    async validarDocente(username: string, password: string): Promise<Usuario> {
        try {
          const usuario = await this.usuarioRepository.findOne({
            where: {
              username: username,
              password: password, // Considera usar una función de hash si no lo estás haciendo.
            },
          });
          if (!usuario) {
            throw new NotFoundException('Credenciales incorrectas');
          }
          return usuario;
        } catch (error) {
          throw new NotFoundException('Credenciales incorrectas');
        }
      }      

}
