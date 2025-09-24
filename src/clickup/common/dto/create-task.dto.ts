import { IsString, IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Task name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Task description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Task status ID' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Priority level (1-4)' })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiPropertyOptional({ description: 'Due date timestamp in milliseconds' })
  @IsOptional()
  @IsNumber()
  due_date?: number;

  @ApiPropertyOptional({ description: 'Start date timestamp in milliseconds' })
  @IsOptional()
  @IsNumber()
  start_date?: number;

  @ApiPropertyOptional({ description: 'Time estimate in milliseconds' })
  @IsOptional()
  @IsNumber()
  time_estimate?: number;

  @ApiPropertyOptional({ description: 'Array of assignee user IDs' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  assignees?: number[];

  @ApiPropertyOptional({ description: 'Array of tag names' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Parent task ID' })
  @IsOptional()
  @IsString()
  parent?: string;

  @ApiPropertyOptional({ description: 'Mark as markdown content' })
  @IsOptional()
  @IsBoolean()
  markdown?: boolean;

  @ApiPropertyOptional({ description: 'Custom fields array' })
  @IsOptional()
  @IsArray()
  custom_fields?: Array<{
    id: string;
    value: any;
  }>;
}