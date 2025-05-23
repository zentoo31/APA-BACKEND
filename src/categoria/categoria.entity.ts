import { Desempeño } from "src/desempeño/desempeño.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'DIM_CATEGORIA_DEST' })
export class Categoria {
    @PrimaryColumn({ length: 1 })
    idCategoriaE: string;

    @Column({ nullable: true, length: 100 })
    Categoria: string;

    @OneToMany(()=>Desempeño,(desempeño)=>desempeño.categoria)
    @JoinColumn({name:'idCategoriaE'})
    desempeño: Desempeño;
}