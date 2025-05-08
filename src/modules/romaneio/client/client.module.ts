import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from 'src/entities/client.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Address } from 'src/entities/address.entities';
import { CepLookupDto } from './dto/create-client.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Address, CepLookupDto]), HttpModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
