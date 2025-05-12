import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entities';
import { In, Repository } from 'typeorm';
import { OrderItem } from 'src/entities/orderitens.entities';
import { Client } from 'src/entities/client.entities';
import { Product } from 'src/entities/product.entities';
import { NotFoundError } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    
    const today = new Date()

    const clientExist = await this.clientRepository.findOne({
      where: {
        document: createOrderDto.clientDocument,
      }
    })

    if(!clientExist){
      throw new BadRequestException('Unregistered client.')
    }

    const { itens } = createOrderDto;
    if (!Array.isArray(itens) || itens.length === 0) {
      throw new BadRequestException('Mandatory itens.')
    }

    const productCodes = itens.map(it => it.productCode)

    const products = await this.productRepository.find({
      where: { productCode: In(productCodes) },
    });

    if(products.length !== itens.length){
      throw new NotFoundException('Some products were not found.')
    }

    const orderExist = await this.orderRepository.find({
      where: {
        client: {document: createOrderDto.clientDocument},
        deliveryDate: createOrderDto.deliveryDate,
      },
      relations: ['itens', 'itens.product'],
    })

    for (const order of orderExist) {
      
      const isSameLength = order.itens.length === createOrderDto.itens.length;

      const allItemsMatch = createOrderDto.itens.every(dtoItem => {
        return order.itens.some(orderItem =>
          orderItem.product.productCode === dtoItem.productCode &&
          orderItem.quantity === dtoItem.quantity
        );
      });

      if (isSameLength && allItemsMatch) {
        throw new ConflictException('Order already exists with the same products and delivery date.')
      }

    }

    if(createOrderDto.truckarrivalDate < today || createOrderDto.deliveryDate < today){
     throw new BadRequestException('The truck arrival date or delivery date can not be less than the current date');
    }

    if(createOrderDto.deliveryDate < createOrderDto.truckarrivalDate){
      throw new BadRequestException('The truck arrival data can not be less than the delivery date')
    }

    const order = await this.orderRepository.create({
      ...createOrderDto,
      createdAt: new Date(),
      itens: itens.map(it => this.orderItemRepository.create(it))
    })

    const saveOrder = await this.orderRepository.save(order)

    return saveOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
