import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Unidad } from '../unidad/unidad.entity';
import { TipoCalificacion } from '../tipocalificacion/tipocalificacion.entity';
import { Estudiante } from '../estudiantes/estudiantes.entity';
import { Categoria } from '../categoria/categoria.entity';
import { Curso } from '../curso/curso.entity';
import { Profesor } from '../profesores/profesores.entity';
import { Tiempo } from '../tiempo/tiempo.entity';
import { Ambiente } from '../ambiente/ambiente.entity';
import { Tipo } from 'src/tipo/tipo.entity';
import { Carrera } from 'src/carrera/carrera.entity';

@Entity({ name: 'H_DESEMPEÑO_DEST' })
export class Desempeño {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    nota: number;

    @Column({ type: 'nvarchar', length: 2, nullable: true })
    idUnidad: string;

    @Column({ type: 'nvarchar', length: 2, nullable: true })
    idTipo: string;

    @Column({ type: 'int', nullable: true })
    codigoE: number;

    @Column({ type: 'nvarchar', length: 1, nullable: true })
    idCategoriaE: string;

    @Column({ type: 'nvarchar', length: 10, nullable: true })
    idCurso: string;

    @Column({ type: 'int', nullable: true })
    idCarrera: number;

    @Column({ type: 'int', nullable: true })
    codigoD: number;

    @Column({ type: 'date', nullable: true })
    fechaInicio: Date;

    @Column({ type: 'nvarchar', length: 1, nullable: true })
    Turno: string;

    @Column({ type: 'nvarchar', length: 4, nullable: true })
    aula: string;

    @Column({ type: 'nvarchar', length: 1, nullable: true })
    Pabellon: string;

    @ManyToOne(()=>Unidad, (unidad)=>unidad.desempeño)
    @JoinColumn({name:'idUnidad'})
    unidad: Unidad;

    @ManyToOne(()=>TipoCalificacion, (tipo)=>tipo.desempeño)
    @JoinColumn({name: 'idTipo'})
    tipo:Tipo;
    
    @ManyToOne(()=>Estudiante, (estudiante)=>estudiante.desempeño)
    @JoinColumn({name:'codigoE'})
    estudiante:Estudiante;

    @ManyToOne(()=>Profesor, (profesor)=>profesor.desempeño)
    @JoinColumn({name:'codigoD'})
    profesor:Profesor;

    
    @ManyToOne(()=>Categoria, (categoria)=>categoria.desempeño)
    @JoinColumn({name:'idCategoriaE'})
    categoria:Categoria;

    @ManyToOne(()=>Curso, (curso)=>curso.desempeño)
    @JoinColumn({name:'idCurso'})
    curso:Curso;

    @ManyToOne(()=>Carrera, (carrera)=>carrera.desempeño)
    @JoinColumn({name:'idCarrera'})
    carrera:Carrera;

    @ManyToOne(() => Tiempo, (tiempo) => tiempo.desempeño)
    @JoinColumn([
        { name: 'fechaInicio', referencedColumnName: 'fechaInicio' },
        { name: 'Turno', referencedColumnName: 'Turno' },
    ])
    tiempo: Tiempo;

    @ManyToOne(() => Ambiente, (ambiente) => ambiente.desempeño)
    @JoinColumn([
        { name: 'aula', referencedColumnName: 'aula' },
        { name: 'Pabellon', referencedColumnName: 'idPabellon' },
    ])
    ambiente: Ambiente;

}
