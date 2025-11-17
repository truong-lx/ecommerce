import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ProductImage } from '../schemas/product.schema';
import { ProductOption } from '../schemas/product-option.schema';
import { Variant } from '../schemas/variant.schema';
import { Review } from '../schemas/review.schema';

export class CreateProductDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Title is required!' })
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  product_type: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  tags: string[];

  @ApiProperty({ type: [ProductImage] })
  @IsArray()
  images: ProductImage[];

  @ApiProperty({ type: [ProductOption] })
  @IsArray()
  options: ProductOption[];

  @IsArray()
  variants: Variant[];

  @ApiProperty({ type: [Review] })
  reviews: Review[];

  @ApiProperty({ type: [String] })
  collections: string[];
}
