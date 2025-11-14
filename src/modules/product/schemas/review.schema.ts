import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductImage } from './product.schema';

@Schema({ _id: true, timestamps: true })
export class Review {
  @Prop({ type: String })
  title: string;
  @Prop({ type: String })
  content: string;
  @Prop({ type: [ProductImage], default: [] })
  images: ProductImage[];
  @Prop({ type: Number })
  rating: number;
  @Prop({ type: Date })
  created_at?;
  @Prop({ type: Date })
  updated_at?;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
