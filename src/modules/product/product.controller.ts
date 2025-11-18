import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create.dto';
import { Pagination } from 'src/libs/decorators/pagination.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDTO) {
    return this.productService.create(createProductDto);
  }

  @Get()
  getProducts(@Pagination() pagination, @Query('published') published = true) {
    return this.productService.getProducts({ pagination, query: { published } });
  }
}
