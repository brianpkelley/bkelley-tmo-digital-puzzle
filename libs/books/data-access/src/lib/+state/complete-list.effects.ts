import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { Book, ReadingListItem } from '@tmo/shared/models';
import * as CompleteListActions from './complete-list.actions';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class CompleteListEffects implements OnInitEffects {
  loadCompleteList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompleteListActions.completeListInit),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/complete-list').pipe(
          map((data) =>
            CompleteListActions.loadCompleteListSuccess({ list: data })
          ),
          catchError((error) =>
            of(CompleteListActions.loadCompleteListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompleteListActions.addToCompleteList),
      concatMap(({ book }) => {
			return this.http.post('/api/complete-list', book).pipe(
				map(() => CompleteListActions.confirmedAddToCompleteList({ book })),
				catchError(() =>
					of(CompleteListActions.failedAddToCompleteList({ book }))
				)
			)
		}
      )
    )
  );

  removeOnAddToReadingList$ = createEffect(() => 
  	this.actions$.pipe( 
	  ofType( ReadingListActions.addToReadingList ),
	  map( ({ book }) => {
		const { id, ...rest } = book; 
		const item = {
			bookId: id,
			...rest
		}
		return CompleteListActions.removeFromCompleteList( { item } );
	  })
	)
  );
	  
	removeBook$ = createEffect(() =>
		this.actions$.pipe(
		ofType(CompleteListActions.removeFromCompleteList),
		concatMap(({item}) => {
				return this.http.delete(`/api/complete-list/${item.bookId}`).pipe(
				map(() =>
					CompleteListActions.confirmedRemoveFromCompleteList({ item })
				),
				catchError(() =>
					of(CompleteListActions.failedRemoveFromCompleteList({ item }))
				)
			)
			
			
			}
		)
		)
	);

  ngrxOnInitEffects() {
    return CompleteListActions.completeListInit(); 
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
