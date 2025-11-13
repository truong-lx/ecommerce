import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../product/schemas/product.schema';
import slugify from 'slugify';
export class CollectionImage {
  src: string;
  alt: string;
}

@Schema({
  timestamps: true,
  collection: 'Collections',
})
export class Collection {
  @Prop({ trim: true, type: String, index: true })
  title;

  @Prop({ type: String, unique: true })
  handle;

  @Prop({ type: String })
  description;

  @Prop({ type: CollectionImage })
  image;

  @Prop({ type: [Product], ref: 'Product' })
  products;

  @Prop({ type: Boolean, default: true })
  actived;

  @Prop({ type: Boolean, default: false })
  deleted;
}
export type CollectionDocument = Collection & Document;
export const CollectionSchema = SchemaFactory.createForClass(Collection);
CollectionSchema.pre('save', function (next) {
  this.handle = slugify(this.title, { lower: true, strict: true });
  next();
});
