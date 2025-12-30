import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductPriceDto } from './dto/create-product.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ProductPriceFilterDto } from './dto/filter-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiOperation(
    {
      summary: 'Register a product price',
      description: 'Registers a new product price in the system.'
    }
  )
  @Post('/price')
  @HttpCode(201)
  async registerProductPrice(@Query() createProductPriceDto: CreateProductPriceDto) {
    try {
      return this.productsService.registerProductPrice(createProductPriceDto);
    } catch (error) {
      throw new Error('Error registering product price');
    }

  }


  @ApiOperation(
    {
      summary: 'Get all product prices',
      description: 'Retrieves a list of all product prices stored in the system.'
    }
  )
  @Get('/prices')
  async findAllProductPrices(
    @Query() filters: ProductPriceFilterDto
  ) {
    try {
      return this.productsService.findAllProductPrices(filters);
    } catch (error) {
      throw new Error('Error retrieving product prices');
    }
  }

  @ApiOperation(
    {
      summary: 'Get product price by ID',
      description: 'Retrieves a specific product price by its unique identifier.'
    }
  )
  @Get('/price/:id')
  async findProductPriceById(@Param('id') id: string) {
    try {
      return this.productsService.findProductPriceById(id);
    } catch (error) {
      throw new Error('Error retrieving product price');
    }
  }

  @ApiOperation(
    {
      summary: 'Update a product price',
      description: 'Updates the details of an existing product price.'
    }
  )
  @Patch('/price/:id')
  async update(@Param('id') id: string, @Query() createProductPriceDto: CreateProductPriceDto) {
    try {
      return this.productsService.updateProductPrice(id, createProductPriceDto);
    } catch (error) {
      throw new Error('Error updating product price');
    }
  }

  @ApiOperation(
    {
      summary: 'Delete a product price',
      description: 'Deletes a product price from the system by its unique identifier.'
    }
  )
  @Delete('/price/:id')
  @HttpCode(204)
  async deleteProductPrice(@Param('id') id: string) {
    try {
      return this.productsService.deleteProductPrice(id);
    } catch (error) {
      throw new Error('Error deleting product price');
    }
  }

}
