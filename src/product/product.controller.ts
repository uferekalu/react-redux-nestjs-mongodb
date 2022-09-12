import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async findAllProducts(): Promise<Product[]> {
    return await this.service.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findAProduct(@Param('id') id: string): Promise<Product> {
    return await this.service.findOne(id);
  }

  @Post()
  async createAProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.service.create(createProductDto);
  }

  @Put(':id')
  async updateAProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.service.update(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.service.deleteProduct(id)
  }
}
