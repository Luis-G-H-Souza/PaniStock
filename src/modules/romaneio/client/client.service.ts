import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { AddressDto, CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entities';
import { Repository } from 'typeorm';
import { Address } from 'src/entities/address.entities';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(createClientDto: CreateClientDto
  ) {

    const { address } = createClientDto;

    if (!Array.isArray(address) || address.length === 0) {
      throw new BadRequestException('Mandatory address.')
    }

    const clientExist = await this.clientRepository.findOne({
      where: {
        document: createClientDto.document,
      }
    });
  
    if(clientExist){
      throw new ConflictException('Client already registered.');
    }

    const client = this.clientRepository.create({
      ...createClientDto,
      creatAt: new Date(),
      address: address.map(addr => this.addressRepository.create(addr))
    })
    const saveClient = this.clientRepository.save(client)
    return saveClient;
  }

  async getAddressByCep(zipCode: string) {

     if (!zipCode) {
    throw new BadRequestException('CEP não informado');
  }
    const cleanCep = zipCode.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      throw new BadRequestException('CEP deve conter 8 dígitos');
    }

    const { data } = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (data.erro) {
      throw new BadRequestException('CEP não encontrado');
    }

    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      zip_code: data.cep,
    };
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
