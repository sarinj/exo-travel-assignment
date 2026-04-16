import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListCustomersQuery {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn([
    'name',
    'total_spend',
    'number_of_purchases',
    'status',
    'last_activity',
  ])
  sortBy?:
    | 'name'
    | 'total_spend'
    | 'number_of_purchases'
    | 'status'
    | 'last_activity';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
