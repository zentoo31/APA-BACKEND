import { Personal } from "src/personal/personal.entity";
import { Entity, Column,PrimaryColumn, OneToMany } from "typeorm";

@Entity({name:'distrito'})
export class Distrito {
    @PrimaryColumn()
    IDDistrito: number;

    @Column()
    Nombre_Di: string;  

    @OneToMany(()=>Personal,(personal)=>personal.distrito)
    personal: Personal[];
    
}
