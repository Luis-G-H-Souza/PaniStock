import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { AddressDto, CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('address-by-cep/:zip_code')
async getAddressByCep(@Param('zip_code') zipCode: string) {
    return this.clientService.getAddressByCep(zipCode)
  };


  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
