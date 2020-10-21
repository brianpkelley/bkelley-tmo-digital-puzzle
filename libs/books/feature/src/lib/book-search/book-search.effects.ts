import { Injectable } from '@angular/core';
import {addToReadingList, confirmedAddToReadingList, confirmedRemoveFromReadingList, removeFromReadingList} from '@tmo/books/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';

@Injectable()
export class BooksSearchEffects {
	bookAddedConfirmation$ = createEffect(() =>
	  this.actions$.pipe(
        ofType(confirmedAddToReadingList),
        distinctUntilChanged(),
		concatMap( 
		  ({ book }) => 
			this.snackbar.open( `"${book.title}" successfully added.`, 'Undo', { duration: 5000 } )
			  .onAction().pipe(
                map( () => removeFromReadingList( { item: { bookId: book.id, ...book } } ) )
			  )
         )
	  ))

	  bookRemovedConfirmation$ = createEffect(() =>
	  this.actions$.pipe(
        ofType(confirmedRemoveFromReadingList),
        distinctUntilChanged(),
		concatMap( 
		  ({ item }) => 
			this.snackbar.open( `"${item.title}" successfully removed.`, 'Undo', { duration: 5000 } )
			  .onAction().pipe(
                map( () => addToReadingList( { book: { id: item.bookId, ...item } } ) )
			  )
         )
	  ))

  constructor(
    private readonly actions$: Actions,
	private snackbar: MatSnackBar
  ) {}
}
