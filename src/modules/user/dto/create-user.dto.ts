import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(3)
  @MaxLength(250)
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
