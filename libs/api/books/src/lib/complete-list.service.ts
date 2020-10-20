import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Completed List';

@Injectable()
export class CompleteListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);
 
  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook( b: ReadingListItem ): Promise<void> {
	  this.storage.update( ( list ) => {
		 list.push( b );
		 return list;
	  });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }
}
