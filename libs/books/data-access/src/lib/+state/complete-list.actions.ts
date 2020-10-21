import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const completeListInit = createAction('[Copmlete List] Initialize');

export const loadCompleteListSuccess = createAction(
  '[Copmlete List API] Load Complete list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadCompleteListError = createAction(
  '[Copmlete List API] Load Complete list error',
  props<{ error: string }>()
);

export const addToCompleteList = createAction(
  '[BCopmlete List API] Mark as Read',
  props<{ book: Book }>()
);

export const failedAddToCompleteList = createAction(
  '[Copmlete List API] Failed add to Complete list',
  props<{ book: Book }>()
);

export const confirmedAddToCompleteList = createAction(
  '[Copmlete List API] Confirmed add to Complete list',
  props<{ book: Book }>()
);

export const removeFromCompleteList = createAction(
	'[Copmlete List API]] Remove from list',
	props<{ item: ReadingListItem }>()
  );
export const confirmedRemoveFromCompleteList = createAction(
	'[Copmlete List API] Confirmed Remove from Complete List',
	props<{ item: ReadingListItem }>()
)
export const failedRemoveFromCompleteList = createAction(
	'[Copmlete List API] Faild to Mark as Complete',
	props<{ item: ReadingListItem }>()
)