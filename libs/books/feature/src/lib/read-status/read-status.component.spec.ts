import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReadingListBook } from '@tmo/books/data-access';
import { createCompleteListItem, SharedTestingModule } from '@tmo/shared/testing';
import { ReadStatusComponent } from './read-status.component';

describe('ReadStatusComponent', () => {
  let component: ReadStatusComponent;
  let fixture: ComponentFixture<ReadStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  declarations: [ ReadStatusComponent ],
	  imports: [MatIconModule, MatButtonModule, SharedTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadStatusComponent);
	component = fixture.componentInstance;
	const { bookId, ...rest } = createCompleteListItem('A');
	component.book = { id: bookId, ...rest, isAdded: false } as ReadingListBook;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
