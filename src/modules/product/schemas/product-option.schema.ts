import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: true })
export class ProductOption {
  @Prop()
  name: string;

  @Prop({ type: [String], default: [] })
  values: string[];
}
export const ProductOptionSchema = SchemaFactory.createForClass(ProductOption);
