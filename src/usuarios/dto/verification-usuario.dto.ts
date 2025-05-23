import { IsNotEmpty, IsString } from 'class-validator';

export class VerificationUsuarioDto {
    @IsNotEmpty()
    @IsString()
    codigoVerificacion: string;
}

