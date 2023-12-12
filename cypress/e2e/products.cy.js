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
    cy.get('.inventory_item_name')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .should((list) => {
        const sorted_list = list.toSorted()
        console.log('list: ' + list)
        console.log('sorted list: ' + sorted_list)
        expect(list).to.be.deep.equal(sorted_list)
      })
  })

  it('confirms reverse alphabetical sort option works', () => {
    cy.getByData('product_sort_container').select('za')
    cy.get('.inventory_item_name')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .should((list) => {
        const reversed_list = list.toSorted().toReversed()
        console.log('list: ' + list)
        console.log('reverse sorted list: ' + reversed_list)
        expect(list).to.be.deep.equal(reversed_list)
      })
  })

  // Borrowed from https://cypress.tips/courses/swag-store/lessons/lesson02
  it('confirms the item with the lowest price', () => {
    cy.get('.inventory_item_price')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .then((list) => Cypress._.map(list, (s) => s.substring(1)))
      .then(console.log)
      .then((list) => Cypress._.map(list, Number))
      .then(console.log)
      .then((list) => Cypress._.min(list))
      .then(console.log)
      .should('equal', 7.99)
  })
})
