import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  feedTitle?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsOptional()
  published?: Date;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  mediaLink?: string;
}
