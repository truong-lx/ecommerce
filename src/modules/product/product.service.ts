import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create.dto';
import { PaginationParams } from 'src/libs/decorators/pagination.decorator';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  private getProductOptions(product: ProductDocument) {
    if (
      +product?.options?.length &&
      product.options[0]?.name &&
      product.options[0].values.length > 0
    ) {
      return product.options;
    }
    if (product?.variants?.length) {
      return [];
    }
    const option1 = { name: 'option1', values: [] } as any;
    const option2 = { name: 'option2', values: [] } as any;
    const option3 = { name: 'option3', values: [] } as any;
    product.variants.forEach((variant, index) => {
      if (variant?.option1) {
        if (variant.option1) {
          if (!option1.values.includes(variant.option1)) {
            option1.values.push(variant.option1);
          }
          if (variant.option2) {
            if (!option2.values.includes(variant.option2)) {
              option2.values.push(variant.option2);
            }
          }
          if (variant.option3) {
            if (!option3.values.includes(variant.option3)) {
              option3.values.push(variant.option3);
            }
          }
        }
      } else if (product.title) {
        const split = product.title.split('/');
        if (split.length > 0 && split[0]?.trim()) {
          if (!option1.values.includes(split[0].trim())) {
            option1.values.push(split[0].trim());
          }
        }
        if (split.length > 1 && split[1]?.trim()) {
          if (!option2.values.includes(split[1].trim())) {
            option2.values.push(split[1].trim());
          }
        }
        if (split.length > 2 && split[2]?.trim()) {
          if (!option3.values.includes(split[2].trim())) {
            option3.values.push(split[2].trim());
          }
        }
      }
    });
  }

  async create(createProductDto: CreateProductDTO) {
    const product = await this.productModel.create(createProductDto);
    return product;
  }
  getProducts({ page, limit, select }: { page: number; limit: number; select: string[] }) {
    const skip = (page - 1) * limit;
    return this.productModel.find().skip(skip).limit(limit);
  }
}
