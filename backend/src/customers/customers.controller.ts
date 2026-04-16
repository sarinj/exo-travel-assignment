import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListCustomersQuery } from './dto/list-customers.query';
import { CustomersService } from './customers.service';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'List customers with search/sort/pagination' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: [
      'name',
      'total_spend',
      'number_of_purchases',
      'status',
      'last_activity',
    ],
  })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get()
  async findAll(@Query() query: ListCustomersQuery) {
    return this.customersService.list(query);
  }

  @ApiOperation({ summary: 'Get customer profile by id' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.getById(Number(id));

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
