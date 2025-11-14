import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import slugify from 'slugify';
import { ProductOption, ProductOptionSchema } from './product-option.schema';
import { Variant, VariantSchema } from './variant.schema';
import { Review, ReviewSchema } from './review.schema';

export class VariantOption {
  name: string;
  value: string;
}
export class ProductImage {
  src: string;
  alt: string;
}

@Schema({
  timestamps: true,
  collection: 'Products',
})
export class Product {
  @Prop({ type: String, trim: true, index: true })
  title;

  @Prop({ type: String })
  description;

  @Prop({ type: String })
  product_type;

  @Prop({ type: String, unique: true })
  handle;

  @Prop({ type: [String], default: [] })
  tags;

  @Prop({ type: [ProductImage], default: [] })
  images: ProductImage[];

  @Prop({
    type: [ProductOptionSchema],
    default: [],
  })
  options: ProductOption[];

  @Prop({ type: [VariantSchema], default: [] })
  variants: Variant[];

  @Prop({ type: [ReviewSchema], default: [], _id: true })
  reviews: Review[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Collection' }] })
  collections;

  @Prop({ type: Boolean, default: true })
  published;

  @Prop({ type: Boolean, default: false })
  deleted;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.pre('save', function (next) {
  this.handle = slugify(this.title, { lower: true, strict: true });
  next();
});
