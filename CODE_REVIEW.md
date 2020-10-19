- [Review](#review)
		- [Code Smells](#code-smells)
		- [Improvements](#improvements)
- [Lighthouse Report](#lighthouse-report)
- [Accessibility Issues](#accessibility-issues)

# Review
### Code Smells
- libs/feature/src/lib/reading-list/reading-list.component.ts
  - removeFromReadingList( item ) missing parameter type
- libs/feature/src/lib/total-count/total-count.component.ts
  - ngOnInit unnecessary

### Improvements
- Ability to clear search form without interacting with textbox (highlight/delete), i.e. clear button
- Lock reading list open and change mode to `side` on larger screens when the reading list has items.
- Improve focus visibility on buttons.

# Lighthouse Report
- Buttons do not have an accessible name.
- Backgound and foreground colors do not have a sufficient contrast ratio.

# Accessibility Issues
- Missing role's on elements
- Example link not focusable with tab
  - Not clickable with keyboard events
- Book Covers not in figure/no alt text
- Missing access key on search box
- Book title not in heading tag