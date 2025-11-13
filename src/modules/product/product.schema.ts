import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import slugify from 'slugify';
export class ProductOption {
  name: string;
  values: [string];
}
export class VariantOption {
  name: string;
  value: string;
}
export class ProductImage {
  src: string;
  alt: string;
}

export class ProductVariant {
  title: string;
  sku: string;
  price: string;
  compare_at_price: string;
  option1?: string;
  option2?: string;
  option3?: string;
  image: ProductImage;
  created_at: Date;
  updated_at: Date;
}

export class Review {
  title: string;
  content: string;
  images: ProductImage[];
  rating: number;
  created_at: Date;
  updated_at: Date;
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
  code;

  @Prop({ type: String })
  product_type;

  @Prop({ type: String, unique: true })
  handle;

  @Prop({ type: [String], default: [] })
  tags;

  @Prop({ type: [ProductImage], default: [] })
  images: ProductImage[];

  @Prop({
    type: [ProductOption],
    default: [],
  })
  options: ProductOption[];

  @Prop({ type: [ProductVariant], default: [] })
  variants: ProductVariant[];

  @Prop({ type: [Review], default: [] })
  reviews: Review[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Collection' }] })
  collections;

  @Prop({ type: Boolean, default: false })
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
