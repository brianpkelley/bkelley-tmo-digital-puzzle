import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksPartialState } from './books.reducer';
import { getBooks, shouldFilterComplete } from './books.selectors';
import {
  READING_LIST_FEATURE_KEY,
  readingListAdapter,
  ReadingListPartialState,
  State
} from './reading-list.reducer';

import { Book, ReadingListItem } from '@tmo/shared/models';
import { CompleteListPartialState } from './complete-list.reducer';
import { getCompleteListEntities } from './complete-list.selectors';

export const getReadingListState = createFeatureSelector<
  ReadingListPartialState,
  State
>(READING_LIST_FEATURE_KEY);

const {
  selectEntities,
  selectAll,
  selectTotal
} = readingListAdapter.getSelectors();

export const getReadingListEntities = createSelector(
  getReadingListState,
  selectEntities
);

export interface ReadingListBook extends Book, Omit<ReadingListItem, 'bookId'> {
  isAdded: boolean;
  finished: boolean;
  finishedDate: string;
}

export const getAllBooks = createSelector<
  BooksPartialState & ReadingListPartialState & CompleteListPartialState,
  Book[],
  Record<string, ReadingListItem>,
  Record<string, ReadingListItem>,
  boolean,
  ReadingListBook[]
>(getBooks, getReadingListEntities, getCompleteListEntities, shouldFilterComplete, (books, entities, completed, filterList ) => {
  const list = books.map(b => ({ 
	  ...b, 
	  isAdded: Boolean(entities[b.id]),
	  finished: completed[b.id] ? Boolean( completed[b.id].finished ) : false,
	  finishedDate: completed[b.id] ? completed[b.id].finishedDate || '' : '',
	}));
	
	if ( filterList ) {
		list.sort( ( a, b ) => {

			if ( a.finished && !b.finished ) {
				return 1;
			} else if ( b.finished && !a.finished ) {
				return -1;
			} else {
				return 0;
			}
		})
	}

	return list;
});

export const getReadingListAll = createSelector(getReadingListState, selectAll);
export const getReadingList = createSelector<
	ReadingListItem & ReadingListPartialState & CompleteListPartialState, 
	ReadingListItem[],
	Record<string, ReadingListItem>,
	ReadingListItem[]
	>(getReadingListAll, getCompleteListEntities, ( books, completed ) => {
		return books.map( (b) => ({ 
			...b, 
			finished: completed[b.bookId] ? Boolean( completed[b.bookId].finished ) : false,
			finishedDate: completed[b.bookId] ? completed[b.bookId].finishedDate || '' : '',
		  }) );
	});

export const getTotalUnread = createSelector(getReadingListState, selectTotal);
 