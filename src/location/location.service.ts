import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  // Lấy toàn bộ location
  async findAllLocation(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  // Lấy location theo id
  async findOneLocation(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
        return { id, name: 'Mặc định' } as Location;
    }
    return location;
  }
}