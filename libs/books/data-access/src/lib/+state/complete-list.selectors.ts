import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksPartialState } from './books.reducer';
import { getBooks } from './books.selectors';
import { completeListAdapter, State} from './complete-list.reducer';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { CompleteListPartialState, COMPLETE_LIST_FEATURE_KEY } from './complete-list.reducer';

export const getCompleteListState = createFeatureSelector<
  CompleteListPartialState,
  State
>(COMPLETE_LIST_FEATURE_KEY);

const {
  selectEntities,
  selectAll,
//   selectTotal
} = completeListAdapter.getSelectors();

export const getCompleteListEntities = createSelector(
  getCompleteListState,
  selectEntities
);


export const getCompleteList = createSelector(getCompleteListState, selectAll);

// export const getTotalUnread = createSelector(getCompleteListState, selectTotal);
