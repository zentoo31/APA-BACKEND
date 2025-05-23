import { Desempeño } from 'src/desempeño/desempeño.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'DIM_TIPOCALIFICACION_DEST' })
export class TipoCalificacion {
    @PrimaryColumn({ type: 'nvarchar', length: 2 })
    idTipo: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    descripcion: string;

    @OneToMany(()=>Desempeño,(desempeño)=>desempeño.tipo)
    @JoinColumn({name:'idTipo'})
    desempeño: Desempeño;
}
