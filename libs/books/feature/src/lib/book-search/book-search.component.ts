import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getBooksSearchTerm,
  shouldFilterComplete,
  setFilter, 
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  lastSearchTerm: string;
  searchForm = this.fb.group({
    term: ''
  });
  shouldHideComplete: boolean = false;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }
  set searchTerm( val: string ) {
    this.searchForm.setValue({ term: val || '' });
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
	});
	this.store.select(getBooksSearchTerm).subscribe(term => {
		this.searchTerm = term;
		this.lastSearchTerm = term;
	});
	this.store.select( shouldFilterComplete ).subscribe( hide => {
		this.shouldHideComplete = hide;
	})
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchTerm && this.isNewSearch() ) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  submitButtonText() {
	if ( !this.isNewSearch() ) {
		return 'clear';
	} else {
		return 'search';
	}
  }

  isNewSearch(): boolean {
	return this.lastSearchTerm !== this.searchTerm;
  }

  toggleComplete() {
	  this.store.dispatch(setFilter( {hideComplete: !this.shouldHideComplete} ))
  }
}
