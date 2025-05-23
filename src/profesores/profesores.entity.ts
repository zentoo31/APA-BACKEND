import { Desempeño } from "src/desempeño/desempeño.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'DIM_PROFESOR_DEST'})
export class Profesor{
    @PrimaryColumn()
    codigoD: number;

    @Column({ nullable: true, length: 8 })
    dniProf: string;

    @Column({ nullable: true, length: 100 })
    nombresD: string;

    @Column({ nullable: true, length: 100 })
    apellidosD: string;

    @Column({ nullable: true, length: 50 })
    genero: string;

    @Column({ nullable: true, length: 50 })
    estadoCivil: string;

    @Column({ nullable: true, length: 100 })
    correo: string;

    @Column({ nullable: true, length: 9 })
    celular: string;

    @Column({ nullable: true, length: 100 })
    direccion: string;

    @Column({ nullable: true, length: 80 })
    distrito: string;

    @OneToMany(()=>Desempeño,(desempeño)=>desempeño.profesor)
    @JoinColumn({name:'codigoD'})
    desempeño: Desempeño;
}