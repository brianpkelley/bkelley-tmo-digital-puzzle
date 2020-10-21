import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadStatusComponent } from './read-status.component';
import { MatIconModule } from '@angular/material/icon';
import { BooksDataAccessModule } from '@tmo/books/data-access';



@NgModule({
  declarations: [ReadStatusComponent],
  imports: [
	MatIconModule,
	CommonModule,
	BooksDataAccessModule
  ]
})
export class ReadStatusModule { }
