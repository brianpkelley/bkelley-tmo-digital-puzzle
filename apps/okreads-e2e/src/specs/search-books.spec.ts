import { $, $$, browser, by, element, ExpectedConditions } from 'protractor';


describe('When: Use the search feature', () => {
  beforeEach(async ()=>{
	await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
	);
	
	const form = await $('form');
	const input = await $('input[type="search"]');

	await input.sendKeys('javascript');
	await form.submit();

  })

  const getReadingListLength = async () : Promise<number> => {
	return new Promise( async ( resolve, reject ) => {		
		const readingListItems = $$('tmo-reading-list .reading-list-item');
		const readingListLength = readingListItems.count();	
		resolve( readingListLength );
	} );
  };

  const addItemToReadingList = async () : Promise<void> => {
	return new Promise( async ( resolve ) => {

		const button = await $$('.book--content--info button.mat-primary').get(0);
		await button.click();
		await browser.sleep(500); // Let animations finish
		resolve();
	});
  };

  const removeItemToReadingList = async () : Promise<void> => {
	return new Promise( async ( resolve ) => {
		let button = $$('.book--content--info button.mat-accent');

		if ( !button.count() ) {
			await addItemToReadingList();
			button = $$('.book--content--info button.mat-accent');
		}

		await button.get(0).click();
		await browser.sleep(500); // Let animations finish
		resolve();
	});
  };
	
  it('Then: I should be able to search books by title', async () => {
    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('Then: I should see the icon change from a magnifying glass to an X', async () => {
	const submit = await $('form button');
	const icon = await $('form mat-icon');
	
    expect(icon.getText()).toEqual('clear');
	expect(submit.getAttribute('aria-label')).toEqual('Clear');
	
	await submit.click();

	expect(icon.getText()).toEqual('search');
    expect(submit.getAttribute('aria-label')).toEqual('Search');	
	
  });

  xit('Then: I should see search results as I am typing', async () => {
   // TODO: Implement this test!
  });

  
  it('Then: I should see a toast when a book is added to the reading list.', async () => {
	await addItemToReadingList();

	const snackbar = await browser.driver.findElement( by.css( '.cdk-overlay-container simple-snack-bar span' ));
	expect( snackbar.getText() ).toMatch( 'successfully' );
  });

  it('Then: I should see a toast when a book is removed from the reading list.', async () => {
	await removeItemToReadingList();

	const snackbar = await browser.driver.findElement( by.css( '.cdk-overlay-container simple-snack-bar span' ));
	expect( snackbar.getText() ).toMatch( 'successfully' );
  });
  

  it('Then: I should be able to undo adding an item to the reading list.', async () => {
	const originalLength = await getReadingListLength();
	await addItemToReadingList();
	
	const snackBarAction = await browser.driver.findElement( by.css( '.cdk-overlay-container simple-snack-bar .mat-simple-snackbar-action button') );
	await snackBarAction.click();

	const newLength = await getReadingListLength();
	expect( Math.abs( newLength - originalLength ) ).toBe( 0 );
	
  });

  it('Then: I should be able to undo removing an item from the reading list.', async () => {
	const originalLength = await getReadingListLength();
	await removeItemToReadingList();
	
	const snackBarAction = await browser.driver.findElement( by.css( '.cdk-overlay-container simple-snack-bar .mat-simple-snackbar-action button') );
	await snackBarAction.click();

	const newLength = await getReadingListLength();
	expect( Math.abs( newLength - originalLength ) ).toBe( 0 );
	
  });


});
