import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { CompleteListService } from './complete-list.service';


@Controller()
export class CompleteListController {
  constructor(private readonly completeList: CompleteListService) {}

  @Get('/complete-list/')
  async getReadingList() {
    return await this.completeList.getList();
  }

  @Post('/complete-list/')
  async addToReadingList(@Body() item: ReadingListItem) {
    return await this.completeList.addBook(item);
  }

  @Delete('/complete-list/:id')
  async removeFromReadingList(@Param() params) {
    return await this.completeList.removeBook(params.id);
  }
}
