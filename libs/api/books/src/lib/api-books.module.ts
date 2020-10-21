import { HttpModule, Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { ReadingListService } from './reading-list.service';
import { BooksController } from './books.controller';
import { ReadingListController } from './reading-list.controller';
import { CompleteListController } from './complete-list.controller';
import { CompleteListService } from './complete-list.service';

@Module({
  imports: [HttpModule],
  controllers: [BooksController, ReadingListController, CompleteListController],
  providers: [BooksService, ReadingListService, CompleteListService],
  exports: [BooksService, ReadingListService, CompleteListService]
})
export class ApiBooksModule {}
