import { Prop, SchemaFactory } from '@nestjs/mongoose';
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
export class Product {
  @Prop({ trim: true, type: String })
  title;

  @Prop({ type: String })
  description;

  @Prop({ type: String })
  product_type;

  @Prop({ type: String })
  handle;

  @Prop({ type: [String], default: [] })
  tags;

  @Prop({ type: [ProductImage], default: [] })
  images: ProductImage[];

  @Prop({
    type: Array,
    default: [],
  })
  options: ProductOption[];

  @Prop({ type: [ProductVariant], default: [] })
  variants: ProductVariant[];

  @Prop({ type: Boolean, default: false })
  deleted;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
