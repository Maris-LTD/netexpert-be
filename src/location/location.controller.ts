import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.entity';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // API lấy toàn bộ location
  @Get()
  findAll(): Promise<Location[]> {
    return this.locationService.findAllLocation();
  }

  // API lấy location theo id
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Location> {
    return this.locationService.findOneLocation(id);
  }
}