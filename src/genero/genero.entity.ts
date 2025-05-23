import { Personal } from "src/personal/personal.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'genero'})
export class Genero {
    @PrimaryColumn()
    idGenero: string

    @Column()
    descripcion:string

    @OneToMany(()=> Personal,(personal)=>personal.genero)
    personal: Personal[];
}