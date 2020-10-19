- [Review](#review)
		- [Code Smells](#code-smells)
		- [Improvements](#improvements)
- [Lighthouse Report](#lighthouse-report)

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
