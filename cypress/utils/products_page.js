const sortTypes = {
  Alpha: 'az',
  ReverseAlpha: 'za',
  LoHi: 'lohi',
  HiLo: 'hilo',
}

const products_page = {
  // sort methods
  sortAlpha: () => {
    cy.log('alpha sort')
    cy.getByData('product_sort_container').select(sortTypes.Alpha)
  },

  sortReverseAlpha: () => {
    cy.log('reverse alpha sort')
    cy.getByData('product_sort_container').select(sortTypes.ReverseAlpha)
  },

  sortLoHiPrice: () => {
    cy.log('low to high price sort')
    cy.getByData('product_sort_container').select(sortTypes.LoHi)
  },

  sortHiLoPrice: () => {
    cy.log('high to low price sort')
    cy.getByData('product_sort_container').select(sortTypes.HiLo)
  },

  // confirm sort order methods
  checkAlphaSorted: () => {
    cy.log('checking if products sorted alphabetically')
    cy.get('.inventory_item_name')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .should((list) => {
        const sorted_list = list.toSorted()
        console.log('list: ' + list)
        console.log('sorted list: ' + sorted_list)
        expect(list).to.be.deep.equal(sorted_list)
      })
  },

  checkReverseAlphaSorted: () => {
    cy.log('checking if products sorted reverse alphabetically')
    cy.get('.inventory_item_name')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .should((list) => {
        const reversed_list = list.toSorted().toReversed()
        console.log('list: ' + list)
        console.log('reverse sorted list: ' + reversed_list)
        expect(list).to.be.deep.equal(reversed_list)
      })
  },

  checkLoHiPriceSorted: () => {
    cy.log('checking if products sorted by low to high price')
    cy.get('.inventory_item_price')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .then((list) => Cypress._.map(list, (s) => s.substring(1)))
      .then(console.log)
      .then((list) => Cypress._.map(list, Number))
      .then(console.log)
      .should((list) => {
        const lohi_sorted = list.toSorted((a, b) => a - b)
        console.log('list: ' + list)
        console.log('lohi sorted list: ' + lohi_sorted)
        expect(list).to.be.deep.equal(lohi_sorted)
      })
  },

  checkHiLoPriceSorted: () => {
    cy.log('checking if products sorted by high to low price')
    cy.get('.inventory_item_price')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .then((list) => Cypress._.map(list, (s) => s.substring(1)))
      .then(console.log)
      .then((list) => Cypress._.map(list, Number))
      .then(console.log)
      .should((list) => {
        const hilo_sorted = list.toSorted((a, b) => b - a)
        console.log('list: ' + list)
        console.log('hilo sorted list: ' + hilo_sorted)
        expect(list).to.be.deep.equal(hilo_sorted)
      })
  },

  checkLowestPrice: (expectedLowestPrice) => {
    cy.log('checking that lowest price matches: ' + expectedLowestPrice)
    cy.get('.inventory_item_price')
      .then((list) => Cypress._.map(list, 'innerText'))
      .then(console.log)
      .then((list) => Cypress._.map(list, (s) => s.substring(1)))
      .then(console.log)
      .then((list) => Cypress._.map(list, Number))
      .then(console.log)
      .then((list) => Cypress._.min(list))
      .then(console.log)
      .should('equal', expectedLowestPrice)
  },

  // add to cart
  // remove from cart
}

export default products_page
