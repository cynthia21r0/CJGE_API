import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  })
  name?: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El apellido debe tener al menos 3 caracteres'
  })
  lastname?: string;

  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres'
  })
  username?: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
  password?: string;
}