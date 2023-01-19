import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  last_login?: Date;

  @Prop()
  hach_refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
