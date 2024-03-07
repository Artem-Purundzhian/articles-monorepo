import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: false })
  firstname?: string;

  @Prop({ required: false })
  lastname?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
