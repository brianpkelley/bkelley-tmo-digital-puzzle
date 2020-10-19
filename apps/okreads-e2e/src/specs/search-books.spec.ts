import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('Then: I should see the icon change from a magnifying glass to an X', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
	const input = await $('input[type="search"]');
	const submit = await $('form button');
	const icon = await $('form mat-icon');
	
    expect(icon.getText()).toEqual('search');
    expect(submit.getAttribute('aria-label')).toEqual('Search');
	
	await input.sendKeys('javascript');
    await form.submit();
	
	expect(icon.getText()).toEqual('clear');
	expect(submit.getAttribute('aria-label')).toEqual('Clear');
  });

  xit('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // TODO: Implement this test!
  });
});
