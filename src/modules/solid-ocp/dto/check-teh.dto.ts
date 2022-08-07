import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CheckTehDto {
  @IsNotEmpty() // Не может быть пустым
  public type: string;

  @Type(() => Number)
  @Transform(({ value }) => parseInt(value)) // Переводим значение в число
  @IsInt() // Должно быть числом
  readonly lights: number;

  @IsInt() // Должно быть числом
  @Transform(({ value }) => parseInt(value)) // Переводим значение в число
  public wheels: number;

  @IsInt() // Должно быть числом
  @Transform(({ value }) => parseInt(value)) // Переводим значение в число
  public doors: number;
}

export default CheckTehDto;
