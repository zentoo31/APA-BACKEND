import { Desempeño } from "src/desempeño/desempeño.entity";
import {Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'DIM_AMBIENTE_DEST' })
export class Ambiente {
    @PrimaryColumn({ length: 4 })
    aula: string;

    @PrimaryColumn({ length: 1 })
    idPabellon: string;

    @OneToMany(() => Desempeño, (desempeño) => desempeño.ambiente)
    desempeño: Desempeño[];
}
