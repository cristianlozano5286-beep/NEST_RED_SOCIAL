import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'nombre del usuario',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3,{message: 'el nombre debe tener al menos 3 caracteres'})
    @MaxLength(50,{message: 'el nombre no puede tener mas de 50 caracteres'})
    nombre!: string;

    @ApiProperty({
        description: 'correo electronico del usuario',
        maxLength: 100
     })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100,{message: 'correo electronico no puede tener mas de 100 caracteres'})
    correo!: string;

    @ApiProperty({
        description: 'contraseña del usuario',
        minLength: 8,
        maxLength: 20,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8,{message: 'la contraseña debe tener al menos 8 caracteres'})
    @MaxLength(20,{message: 'la contraseña no puede tener mas de 20 caracteres'})
    password!: string;

    @ApiProperty()
    @IsString()
    rol_id!: string;


}