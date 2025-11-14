import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: true })
export class Variant {
  @Prop({ type: String })
  title;

  @Prop({ type: String })
  sku;

  @Prop({ type: Number })
  price;

  @Prop({ type: Number })
  compareAtPrice: number;

  @Prop({ type: String })
  option1?;

  @Prop({ type: String })
  option2?;

  @Prop({ type: String })
  option3?;

  @Prop({ type: String })
  image;

  @Prop({ type: Date })
  created_at?;

  @Prop({ type: Date })
  updated_at?;
}
export const VariantSchema = SchemaFactory.createForClass(Variant);
