import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bid } from './schemas/bid.schema';
import { Model } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class BidService {
  constructor(
    @InjectModel('Bid') private readonly bidModel: Model<Bid>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createBidDto: CreateBidDto) {
    const { userId, productId, amount } = createBidDto;
    const newBid = new this.bidModel({
      userId,
      productId,
      amount,
    });
    const savedBid = await newBid.save();

    await this.productModel
      .findByIdAndUpdate(
        productId,
        { $push: { bids: savedBid._id } },
        { new: true },
      )
      .exec();

    return savedBid;
  }

  findAll() {
    return `This action returns all bid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bid`;
  }

  async highestBid(productId: string) {
    const highestBid = await this.bidModel
      .findOne({ productId })
      .sort({ amount: -1 })
      .populate('userId')
      .exec();

    return highestBid;
  }
}
