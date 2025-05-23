import { Desempeño } from 'src/desempeño/desempeño.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'DIM_TIEMPO_DEST' })
export class Tiempo {
    @PrimaryColumn({ type: 'date' })
    fechaInicio: Date;

    @PrimaryColumn({ type: 'nvarchar', length: 1 })
    Turno: string;

    @Column({ type: 'int', nullable: true })
    DiaInicio: number;

    @Column({ type: 'int', nullable: true })
    MesInicio: number;

    @Column({ type: 'int', nullable: true })
    DiaFinal: number;

    @Column({ type: 'int', nullable: true })
    MesFinal: number;

    @Column({ type: 'nvarchar', length: 9, nullable: true })
    DiaDeClases: string;

    @Column({ type: 'nvarchar', length: 16, nullable: true })
    Semestre: string;

    @Column({ type: 'int', nullable: true })
    Año: number;
    
    @OneToMany(() => Desempeño, (desempeño) => desempeño.tiempo)
    desempeño: Desempeño[];
}
