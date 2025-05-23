import { Desempeño } from "src/desempeño/desempeño.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'DIM_ESTUDIANTES_DEST'})
export class Estudiante{
    @PrimaryColumn()
    CodigoE: number;

    @Column({ nullable: true, length: 8 })
    dniE: string;

    @Column({ nullable: true, length: 100 })
    nombresE: string;

    @Column({ nullable: true, length: 100 })
    apellidosE: string;

    @Column({ nullable: true, length: 50 })
    descripcion: string;

    @Column({ nullable: true, length: 100 })
    correo: string;

    @Column({ nullable: true, length: 50 })
    descripcionE: string;

    @Column({ nullable: true, length: 9 })
    celular: string;

    @Column({ nullable: true, length: 100 })
    direccion: string;

    @Column({ nullable: true, length: 80 })
    descripcionD: string;

    @Column({ nullable: true, length: 50 })
    descripcionCon: string;

    @OneToMany(()=>Desempeño,(desempeño)=>desempeño.estudiante)
    @JoinColumn({name:'codigoD'})
    desempeño: Desempeño[];
}