import { Desempeño } from 'src/desempeño/desempeño.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'DIM_CURSO_DEST' })
export class Curso {
    @PrimaryColumn({ type: 'nvarchar', length: 10 })
    idCurso: string;

    @Column({ type: 'nvarchar', length: 100, nullable: true })
    NombreCurso: string;

    @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
    NumeroCreditos: number;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    CategoriaCurso: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    Ciclo: string;

    @OneToMany(()=>Desempeño,(desempeño)=>desempeño.curso)
    @JoinColumn({name:'idCurso'})
    desempeño: Desempeño;
}
