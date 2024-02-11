import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditArticleDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  link?: string;
}
