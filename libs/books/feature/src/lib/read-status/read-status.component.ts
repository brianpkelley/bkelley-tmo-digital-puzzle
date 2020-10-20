import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { addToCompleteList, ReadingListBook, removeFromCompleteList } from '@tmo/books/data-access';


@Component({
  selector: 'tmo-read-status',
  templateUrl: './read-status.component.html',
  styleUrls: ['./read-status.component.scss']
})
export class ReadStatusComponent implements OnInit {

  @Input() book : ReadingListBook;

  constructor( private readonly store: Store, private sanitizer: DomSanitizer, public iconRegigstry: MatIconRegistry ) {
	  this.iconRegigstry.addSvgIconLiteral( 
		  'book-read',
		  this.sanitizer.bypassSecurityTrustHtml('<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M6 22C4.89 22 4 21.1 4 20V4C4 2.89 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.34C19.37 13.12 18.7 13 18 13C14.69 13 12 15.69 12 19C12 20.09 12.29 21.12 12.8 22H6Z" /></svg>')
	  );

   }

  ngOnInit(): void {
  }

  markAsComplete(){
	  if ( this.book.finished ) {
		  this.store.dispatch( removeFromCompleteList( {item: { bookId: this.book.id, ...this.book }} ) );
	  } else {
		  const item = {
			...this.book,
			finished: true,
			finishedDate: new Date().toISOString()
		  }
		  this.store.dispatch( addToCompleteList( {book: item }) );
	  }
  }

}
 