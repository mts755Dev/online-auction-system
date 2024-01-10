import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/user/role/role.guard';
import { UserRole } from 'src/user/schemas/user.schema';
import { Roles } from 'src/user/role/role.decorator';

@Controller('bid')
@UseGuards(JwtAuthGuard)
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post(':productId')
  @UseGuards(RoleGuard)
  @Roles(UserRole.Buyer)
  create(
    @Param('productId') productId: string,
    @Body() createBidDto: CreateBidDto,
  ) {
    return this.bidService.create({ ...createBidDto, productId });
  }

  @Get()
  findAll() {
    return this.bidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidService.findOne(+id);
  }

  @Get(':productId/highest-bid')
  findHighestBidForProduct(@Param('productId') productId: string) {
    return this.bidService.highestBid(productId);
  }
}
