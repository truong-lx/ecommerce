import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Product {
  @Prop({ trim: true, type: String })
  title;

  @Prop({ type: String })
  description;

  @Prop({ type: String })
  product_type;

  @Prop({ type: String })
  handle;

  @Prop({ type: [String] })
  tags;

  @Prop({ type: Boolean, default: false })
  deleted;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
