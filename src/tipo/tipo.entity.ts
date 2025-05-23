import { Personal } from "src/personal/personal.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'tipo'})
export class Tipo{
    @PrimaryColumn()
    idTipo: number

    @Column()
    descripcion: string

    @OneToMany(()=>Personal,(personal)=>personal.tipo)
    personal: Personal[];
}