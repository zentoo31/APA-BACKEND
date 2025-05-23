import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { PersonalModule } from './personal/personal.module';
import { GeneroModule } from './genero/genero.module';
import { DistritoModule } from './distrito/distrito.module';
import { EstadocivilModule } from './estadocivil/estadocivil.module';
import { TipoModule } from './tipo/tipo.module';
import { MailerModule } from './mailer/mailer.module'; // Importa el MailerModule
import { EmailController } from './mailer/mailer.controller'; // Importa el EmailController
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { CarreraModule } from './carrera/carrera.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AmbienteModule } from './ambiente/ambiente.module';
import { CursoModule } from './curso/curso.module';
import { TipocalificacionModule } from './tipocalificacion/tipocalificacion.module';
import { UnidadModule } from './unidad/unidad.module';
import { TiempoModule } from './tiempo/tiempo.module';
import { DesempeñoModule } from './desempeño/desempeño.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
            ConfigModule.forRoot({
              isGlobal: true,
              envFilePath: '.env',
            }),
            TypeOrmModule.forRootAsync({
             imports: [ConfigModule],
             inject: [ConfigService],
             useFactory: async (configService: ConfigService) => ({
               type: 'mssql',
                host: configService.get('DB_HOST'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                options: {
                  encrypt: true, // Para Azure
                  enableArithAbort: true, // Para Azure
                  trustServerCertificate: false,
                }
              })
            }),
            UsuariosModule,
            PersonalModule,
            GeneroModule,
            DistritoModule,
            EstadocivilModule,
            TipoModule,
            MailerModule,
            EstudiantesModule,
            ProfesoresModule,
            CarreraModule,
            CategoriaModule,
            AmbienteModule,
            CursoModule,
            TipocalificacionModule,
            UnidadModule,
            TiempoModule,
            DesempeñoModule],
  controllers: [AppController,EmailController],
  providers: [AppService],
})
export class AppModule {}
