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
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/schemas/user.schema';
import { UserRole } from 'src/shared/constants/user-role.enum';
import { RoleGuard } from 'src/shared/role/role.guard';
import { GetUser, Roles } from 'src/shared/role/role.decorator';

@Controller('auction')
@UseGuards(JwtAuthGuard)
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  create(@Body() createAuctionDto: CreateAuctionDto, @GetUser() user: User) {
    return this.auctionService.create(createAuctionDto, user);
  }

  @Get()
  findAll() {
    return this.auctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return this.auctionService.update(id, updateAuctionDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.auctionService.remove(id);
  }

  @Patch(':id/approve')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  approveAuction(@Param('id') id: string) {
    return this.auctionService.approveAuction(id);
  }
}
