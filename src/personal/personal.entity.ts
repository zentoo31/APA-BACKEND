import { Tipo} from "src/tipo/tipo.entity";
import { Distrito } from "src/distrito/distrito.entity";
import { EstadoCivil } from "src/estadocivil/estadocivil.entity";
import { Genero } from "src/genero/genero.entity";
import { Usuario } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name:'personal'})

export class Personal{
    @PrimaryColumn()
    idPersonal: number

    @Column()
    dniPers: string

    @Column()
    nombresP: string

    @Column()
    apellidosP: string

    @Column()
    correo: string

    @Column()
    celular: string

    @Column()
    direccion: string

    @Column()
    idGenero: string
    
    @Column()
    idEstado: string

    @Column()
    idDistrito: number

    @Column()
    idTipo: number

    @ManyToOne(()=> Genero, (genero)=>genero.personal)
    @JoinColumn({name:'idGenero'})
    genero: Genero;

    @ManyToOne(()=>EstadoCivil, (estadocivil)=>estadocivil.profesor)
    @JoinColumn({name:'idEstado'})
    estadocivil: EstadoCivil;

    @ManyToOne(()=>Distrito,(distrito)=>distrito.personal)
    @JoinColumn({name:'idDistrito'})
    distrito: Distrito;

    @ManyToOne(()=>Tipo,(tipo)=>tipo.personal)
    @JoinColumn({name:'idTipo'})
    tipo: Tipo;


    @OneToOne(()=>Usuario,(usuario)=>usuario.personal)
    usuario: Usuario;
}