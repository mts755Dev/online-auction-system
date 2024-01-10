import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/user/role/role.guard';
import { GetUser, Roles } from 'src/user/role/role.decorator';
import { User, UserRole } from 'src/user/schemas/user.schema';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(UserRole.Seller)
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productService.create(createProductDto, user);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id/bids')
  @UseGuards(RoleGuard)
  @Roles(UserRole.Seller)
  findBidsForProduct(@Param('id') id: string) {
    return this.productService.findBidsForProduct(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.Seller)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.Admin, UserRole.Seller)
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.productService.remove(id, user);
  }
}
