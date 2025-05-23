import { Desempeño } from 'src/desempeño/desempeño.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'DIM_UNIDAD_DEST' })
export class Unidad {
    @PrimaryColumn({ type: 'nvarchar', length: 2 })
    idUnidad: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    descripcionU: string;

    
    @OneToMany(()=>Desempeño,(desempeño)=>desempeño.unidad)
    @JoinColumn({name:'idUnidad'})
    desempeño: Desempeño;

}
