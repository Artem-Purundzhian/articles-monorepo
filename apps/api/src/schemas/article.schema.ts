import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Article {
  @Prop({ required: true, unique: true })
  link: string;

  @Prop()
  title: string;

  @Prop()
  description?: string;

  @Prop()
  content?: string;

  @Prop()
  category?: string;

  @Prop()
  feedTitle?: string;

  @Prop()
  author?: string;

  @Prop()
  mediaLink?: string;

  @Prop()
  published?: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
