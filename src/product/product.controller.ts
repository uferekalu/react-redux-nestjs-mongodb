import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async findAllProducts() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findAProduct(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async createAProduct(@Body() createProductDto: CreateProductDto) {
    return await this.service.create(createProductDto);
  }

  @Put(':id')
  async updateAProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.service.update(id, updateProductDto);
  }
}
