import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './estudiantes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {

    constructor(@InjectRepository(Estudiante)private estudianteRepository: Repository<Estudiante>){}

    getEstudiantes(){
        return this.estudianteRepository.find()
    }

    async getEstudiante(CodigoE: number){
        const estudianteE= await this.estudianteRepository.findOne({
            where:{
                CodigoE,
            }
        });

        if(!estudianteE){
            return new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return estudianteE
    }

    async getCantidadEstudiantesPorGenero() {
        const estudiantes = await this.estudianteRepository.find();
        const generoCount = estudiantes.reduce((acc, estudiante) => {
            acc[estudiante.descripcion] = (acc[estudiante.descripcion] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(generoCount).map(genero => ({
            Genero: genero,
            cantidad: generoCount[genero]
        }));
    }

    async getCantidadTotalEstudiantes() {
        const total = await this.estudianteRepository.count();
        return { Total: total };
    }

    async getNotaPromedioClasificdo() {
        const promedios = await this.estudianteRepository
            .createQueryBuilder('estudiante')
            .leftJoinAndSelect('estudiante.desempeño', 'desempeño')
            .select('estudiante.CodigoE', 'CodigoE')
            .addSelect('AVG(desempeño.nota)', 'promedio')
            .groupBy('estudiante.CodigoE')
            .getRawMany();

        const promSatisfactorio = promedios.filter(promedio => promedio.promedio > 16).length;
        const promRegular = promedios.filter(promedio => promedio.promedio <= 16).length;

        return { promedioSatisfactorio: promSatisfactorio, promedioRegular: promRegular };
    }

    async contarEstudiantesPorEstadoCivil() {
        const result = await this.estudianteRepository
        .createQueryBuilder('estudiante')
        .select('COUNT(estudiante.descripcionE)', 'Total')
        .addSelect('SUM(CASE WHEN estudiante.descripcionE = :casado THEN 1 ELSE 0 END)', 'casados')
        .addSelect('SUM(CASE WHEN estudiante.descripcionE = :soltero THEN 1 ELSE 0 END)', 'solteros')
        .addSelect('SUM(CASE WHEN estudiante.descripcionE = :viudo THEN 1 ELSE 0 END)', 'viudos')
        .setParameters({ casado: 'Casado', soltero: 'Soltero', viudo: 'Viudo' })
        .getRawOne();

         return result;
    }

    async getEstudiantesDistritos(): Promise<{ descripcionD: string, cantidad: number }[]> {
        const queryBuilder = this.estudianteRepository.createQueryBuilder('E');
    
        const result = await queryBuilder
            .select('E.descripcionD', 'descripcionD')
            .addSelect('COUNT(*)', 'cantidad')
            .groupBy('E.descripcionD')
            .orderBy('cantidad', 'DESC')
            .limit(10)
            .getRawMany();
    
        return result;
    }
    
    async getTotalConoNorte() {
        const totalEstudiantes = await this.estudianteRepository
        .createQueryBuilder('estudiante')
        .select('SUM(CASE WHEN estudiante.descripcionD IN (:...distritos) THEN 1 ELSE 0 END)', 'total_estudiantes')
        .setParameters({ distritos: ['Ancón', 'Carabayllo', 'Comas', 'Independencia', 'Los Olivos', 'Puente Piedra', 'San Martín de Porres', 'Santa Rosa'] })
        .getRawOne();

        return totalEstudiantes;
      }

}
