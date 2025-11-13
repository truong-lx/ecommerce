import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ProductImage, ProductOption, ProductVariant, Review } from '../product.schema';

export class CreateProductDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
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

  @ApiProperty({ type: [ProductVariant] })
  @IsArray()
  variants: ProductVariant[];

  @ApiProperty({ type: [Review] })
  reviews: Review[];

  @ApiProperty({ type: [String] })
  collections: string[];
}
