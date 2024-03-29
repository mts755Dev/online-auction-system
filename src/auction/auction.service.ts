import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { User } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction } from './schemas/auction.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuctionStatus } from 'src/shared/constants/auction-status';
import { UserRole } from 'src/shared/constants/user-role.enum';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel('Auction') private readonly auctionModel: Model<Auction>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async checkAndEndAuctions() {
    const currentTime = new Date();
    const auctionsToClose = await this.auctionModel
      .find({
        endDateTime: { $lte: currentTime },
        status: AuctionStatus.APPROVED,
      })
      .exec();

    auctionsToClose.forEach(async (auction) => {
      auction.status = AuctionStatus.COMPLETED;
      await auction.save();
    });
  }

  async create(createAuctionDto: CreateAuctionDto, user: User) {
    const status =
      user.role === UserRole.ADMIN
        ? AuctionStatus.APPROVED
        : AuctionStatus.PENDING;

    const createdAuction = new this.auctionModel({
      ...createAuctionDto,
      status,
    });

    return await createdAuction.save();
  }

  async findAll() {
    return await this.auctionModel.find().exec();
  }

  async findOne(id: string) {
    const auction = await this.auctionModel.findById(id).exec();
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
    return auction;
  }

  async update(id: string, updateAuctionDto: UpdateAuctionDto) {
    const auctionToUpdate = await this.auctionModel.findById(id).exec();
    if (!auctionToUpdate) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
    const updatedAuction = await this.auctionModel
      .findByIdAndUpdate(id, updateAuctionDto, { new: true })
      .exec();
    return updatedAuction;
  }

  async remove(id: string) {
    const auctionToDelete = await this.auctionModel.findById(id).exec();
    if (!auctionToDelete) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
    const deletedAuction = await this.auctionModel.findByIdAndDelete(id).exec();
    return deletedAuction;
  }

  async approveAuction(id: string) {
    const auctionToUpdate = await this.auctionModel.findById(id).exec();
    if (!auctionToUpdate) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }

    auctionToUpdate.status = AuctionStatus.APPROVED;
    return await auctionToUpdate.save();
  }
}
