import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';
import { UserRole } from 'src/shared/constants/user-role.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const newProduct = new this.productModel({
      ...createProductDto,
      sellerId: user.id,
      bids: [],
    });
    const savedProduct = await newProduct.save();

    return savedProduct;
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findBidsForProduct(productId: string) {
    const product = await this.productModel
      .findById(productId)
      .populate('bids')
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product.bids;
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const productToUpdate = await this.productModel.findById(id).exec();
    if (!productToUpdate) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if (user.role === UserRole.SELLER && user.id === productToUpdate.sellerId) {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec();
      return updatedProduct;
    } else {
      throw new UnauthorizedException(
        `You do not have permission to update this product`,
      );
    }
  }

  async remove(id: string, user: User) {
    const productToDelete = await this.productModel.findById(id).exec();
    if (!productToDelete) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if (
      user.role === UserRole.ADMIN ||
      (user.role === UserRole.SELLER && user.id === productToDelete.sellerId)
    ) {
      const deletedProduct = await this.productModel
        .findByIdAndDelete(id)
        .exec();
      return deletedProduct;
    } else {
      throw new UnauthorizedException(
        `You do not have permission to delete this product`,
      );
    }
  }
}
