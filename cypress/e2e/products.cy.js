import products_page from '../utils/products_page'

describe('saucedemo products/inventory page spec', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('should load correctly', () => {
    cy.location('pathname').should('equal', '/inventory.html')
    cy.get('.inventory_list')
      .should('be.visible')
      .find('.inventory_item')
      .should('have.length', 6)
    cy.get('span.active_option').should('have.text', 'Name (A to Z)')
    cy.get('span.shopping_cart_badge').should('not.exist')
    products_page.checkAlphaSorted()
  })

  it('confirms reverse alphabetical sort option works', () => {
    products_page.sortReverseAlpha()
    products_page.checkReverseAlphaSorted()
  })

  it('confirms Low to High price sort option works', () => {
    products_page.sortLoHiPrice()
    products_page.checkLoHiPriceSorted()
  })

  it('confirms High to Low price sort option works', () => {
    products_page.sortHiLoPrice()
    products_page.checkHiLoPriceSorted()
  })

  // Borrowed from https://cypress.tips/courses/swag-store/lessons/lesson02
  it('confirms the item with the lowest price', () => {
    products_page.checkLowestPrice(7.99)
  })
})
