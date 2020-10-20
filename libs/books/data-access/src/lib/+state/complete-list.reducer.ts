import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as CompleteListActions from './complete-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const COMPLETE_LIST_FEATURE_KEY = 'completeList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
}

export interface CompleteListPartialState {
  readonly [COMPLETE_LIST_FEATURE_KEY]: State;
}

export const completeListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = completeListAdapter.getInitialState({
  loaded: false,
  error: null
});

const CompleteListReducer = createReducer(
  initialState,
  on(CompleteListActions.completeListInit, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(CompleteListActions.loadCompleteListSuccess, (state, action) => {
    return completeListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(CompleteListActions.loadCompleteListSuccess, (state, action) => {
    return completeListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(CompleteListActions.loadCompleteListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(CompleteListActions.addToCompleteList, (state, action) =>
    completeListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  on(CompleteListActions.removeFromCompleteList, (state, action) =>
    completeListAdapter.removeOne(action.item.bookId, state)
  ),
  on(CompleteListActions.failedRemoveFromCompleteList, (state, action) =>
    completeListAdapter.addOne(action.item, state)
  ),
  on(CompleteListActions.failedAddToCompleteList, (state, action) =>
    completeListAdapter.removeOne(action.book.id, state)
  )

);

export function reducer(state: State | undefined, action: Action) {
  return CompleteListReducer(state, action);
}
