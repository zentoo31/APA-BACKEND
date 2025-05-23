import { Personal } from "src/personal/personal.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'estadocivil'})
export class EstadoCivil{
    @PrimaryColumn()
    idEstado: string

    @Column()
    descripcionE: string

    @OneToMany(()=> Personal,(personal)=> personal.estadocivil)
    profesor: Personal[];
}