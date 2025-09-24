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
import { ListsService } from './lists.service';
import { ClickUpList } from '../common/interfaces/clickup-response.interface';

@ApiTags('Lists')
@Controller('api/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get('space/:spaceId')
  @ApiOperation({ summary: 'Get lists in a space' })
  @ApiParam({ name: 'spaceId', description: 'ClickUp Space ID' })
  @ApiQuery({ name: 'archived', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Lists retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getListsBySpaceId(
    @Param('spaceId') spaceId: string,
    @Query('archived') archived?: boolean,
  ): Observable<{ lists: ClickUpList[] }> {
    return this.listsService.getListsBySpaceId(spaceId, { archived });
  }

  @Get('folder/:folderId')
  @ApiOperation({ summary: 'Get lists in a folder' })
  @ApiParam({ name: 'folderId', description: 'ClickUp Folder ID' })
  @ApiQuery({ name: 'archived', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Lists retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getListsByFolderId(
    @Param('folderId') folderId: string,
    @Query('archived') archived?: boolean,
  ): Observable<{ lists: ClickUpList[] }> {
    return this.listsService.getListsByFolderId(folderId, { archived });
  }

  @Get(':listId')
  @ApiOperation({ summary: 'Get a specific list by ID' })
  @ApiParam({ name: 'listId', description: 'ClickUp List ID' })
  @ApiResponse({ status: 200, description: 'List retrieved successfully' })
  @ApiResponse({ status: 404, description: 'List not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getListById(@Param('listId') listId: string): Observable<ClickUpList> {
    return this.listsService.getListById(listId);
  }

  @Post('folder/:folderId')
  @ApiOperation({ summary: 'Create a new list in a folder' })
  @ApiParam({ name: 'folderId', description: 'ClickUp Folder ID' })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createListInFolder(
    @Param('folderId') folderId: string,
    @Body() listData: any,
  ): { message: string } {
    void folderId;
    void listData;
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  @Post('space/:spaceId')
  @ApiOperation({ summary: 'Create a new list in a space (folderless)' })
  @ApiParam({ name: 'spaceId', description: 'ClickUp Space ID' })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createListInSpace(
    @Param('spaceId') spaceId: string,
    @Body() listData: any,
  ): { message: string } {
    void spaceId;
    void listData;
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  @Put(':listId')
  @ApiOperation({ summary: 'Update a list' })
  @ApiParam({ name: 'listId', description: 'ClickUp List ID' })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'List not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateList(
    @Param('listId') listId: string,
    @Body() listData: any,
  ): { message: string } {
    void listId;
    void listData;
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  @Delete(':listId')
  @ApiOperation({ summary: 'Delete a list' })
  @ApiParam({ name: 'listId', description: 'ClickUp List ID' })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 404, description: 'List not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deleteList(@Param('listId') listId: string): { message: string } {
    void listId;
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
