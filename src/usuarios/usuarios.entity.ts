import { Personal } from 'src/personal/personal.entity'
import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from 'typeorm'

@Entity({name: 'usuario'})
export class Usuario{
    @PrimaryColumn()
    id: number
    
    @Column()
    username: string

    @Column()
    password: string

    @Column()
    correo: string

    @Column()
    IdPersonal: number

    @Column({ nullable: true }) // Permitir valores nulos para este campo
    codigoVerificacion: string; // Columna para almacenar el código de verificación
  
    @OneToOne(()=>Personal, (personal)=>personal.usuario)
    @JoinColumn({name:'IdPersonal'})
    personal: Personal;


}