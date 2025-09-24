import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SpacesService } from './spaces.service';
import { ClickUpSpace } from '../common/interfaces/clickup-response.interface';

@ApiTags('Spaces')
@Controller('api/spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Get('workspace/:workspaceId')
  @ApiOperation({ summary: 'Get spaces in a workspace' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiQuery({ name: 'archived', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Spaces retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getSpaces(
    @Param('workspaceId') workspaceId: string,
    @Query('archived') archived?: boolean,
  ): Observable<{ spaces: ClickUpSpace[] }> {
    return this.spacesService.getSpaces(workspaceId, { archived });
  }

  @Get(':spaceId')
  @ApiOperation({ summary: 'Get a specific space by ID' })
  @ApiParam({ name: 'spaceId', description: 'ClickUp Space ID' })
  @ApiResponse({ status: 200, description: 'Space retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Space not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getSpaceById(@Param('spaceId') spaceId: string): Observable<ClickUpSpace> {
    return this.spacesService.getSpaceById(spaceId);
  }

  @Post('workspace/:workspaceId')
  @ApiOperation({ summary: 'Create a new space' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createSpace(
    @Param('workspaceId') workspaceId: string,
    @Body()
    spaceData: { name: string; multiple_assignees?: boolean; features?: any },
  ): { message: string } {
    void workspaceId;
    void spaceData;
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  @Put(':spaceId')
  @ApiOperation({ summary: 'Update a space' })
  @ApiParam({ name: 'spaceId', description: 'ClickUp Space ID' })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Space not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateSpace(
    @Param('spaceId') spaceId: string,
    @Body() spaceData: any,
  ): { message: string } {
    void spaceId;
    void spaceData;
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  @Delete(':spaceId')
  @ApiOperation({ summary: 'Delete a space' })
  @ApiParam({ name: 'spaceId', description: 'ClickUp Space ID' })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 404, description: 'Space not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deleteSpace(@Param('spaceId') spaceId: string): { message: string } {
    void spaceId;
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
