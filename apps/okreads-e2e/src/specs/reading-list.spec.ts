import { $, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
	beforeEach( async () => {
		await browser.get('/');
		await browser.wait(
		ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
		);

	})
  it('Then: I should see my reading list', async () => {

	const readingListToggle = await $('[data-testing="toggle-reading-list"]');
	await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it( 'Then: I should be able to mark the book as read', async() => {
	

	const readingListToggle = await $('[data-testing="toggle-reading-list"]');
	
	
	const form = await $('form');
	const input = await $('input[type="search"]');

	await input.sendKeys('javascript');
	await form.submit();

	const button = await $$('.book--content--info button.mat-primary').get(0);
	await button.click();

	
	await readingListToggle.click();
	await browser.wait(
		ExpectedConditions.textToBePresentInElement(
		  $('[data-testing="reading-list-container"]'),
		  'My Reading List'
		)
	  );
	browser.waitForAngular();
	
	  const action = await $$('[data-testing="reading-list-container"] tmo-read-status button').last();
	  await action.click();
	  expect( action.$('mat-icon').getAttribute('color') ).toBe('accent');
	  
	  await action.click();
	  expect( action.getText() ).toBe('book');

  });
});
