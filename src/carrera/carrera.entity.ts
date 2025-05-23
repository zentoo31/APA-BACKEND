import { Desempeño } from "src/desempeño/desempeño.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'DIM_CARRERA_DEST' })
export class Carrera {
    @PrimaryColumn()
    idCarrera: number;

    @Column({ nullable: true, length: 100 })
    nombreCarrera: string;

    @Column({ nullable: true, length: 100 })
    descripcionFa: string;

    @OneToMany(()=>Desempeño,(desempeño)=>desempeño.carrera)
    @JoinColumn({name:'idCarrera'})
    desempeño: Desempeño;
}
