describe('saucedemo purchase spec', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  // TODO: refactor to make test more concise
  it('should be able to purchase a single item', () => {
    // add item to cart
    cy.getByData('add-to-cart-sauce-labs-backpack').click()
    // cart icon shows 1 item icon
    // click cart icon to initiate purchase flow
    cy.get('span.shopping_cart_badge').should('have.text', '1').click()
    // cart shows expected item; on page cart.html
    cy.location('pathname').should('equal', '/cart.html')
    cy.get('.cart_item')
      .should('have.length', 1)
      .within(() => {
        cy.get('.cart_quantity').should('have.text', '1')
        cy.get('.inventory_item_name').should(
          'have.text',
          'Sauce Labs Backpack'
        )
        cy.get('.inventory_item_price').should('have.text', '$29.99')
      })
    // click Checkout button to proceed
    cy.get('[data-test="checkout"]').click()
    // expect name and zip form to show; on page checkout-step-one.html
    cy.location('pathname').should('equal', '/checkout-step-one.html')
    // enter valid first/last and zip, then click Continue button
    cy.getByData('firstName').type('Fred')
    cy.getByData('lastName').type('Jones')
    cy.getByData('postalCode').type('98109')
    cy.getByData('continue').click()
    // confirm checkout overview shows with item/payment info/shipping info/price total; on page checkout-step-two.html
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    cy.get('.cart_item').should('have.length', 1)
    cy.get('.summary_info > :nth-child(1)').should(
      'have.text',
      'Payment Information'
    )
    cy.get('.summary_info > :nth-child(2)').should(
      'have.text',
      'SauceCard #31337'
    )
    cy.get('.summary_info > :nth-child(3)').should(
      'have.text',
      'Shipping Information'
    )
    cy.get('.summary_info > :nth-child(4)').should(
      'have.text',
      'Free Pony Express Delivery!'
    )
    cy.get('.summary_info > :nth-child(5)').should('have.text', 'Price Total')
    cy.get('.summary_subtotal_label').should('have.text', 'Item total: $29.99')
    cy.get('.summary_tax_label').should('have.text', 'Tax: $2.40')
    cy.get('.summary_total_label').should('have.text', 'Total: $32.39')

    // click Finish button
    cy.getByData('finish').click()
    // complete page shows with Thank you text; on page checkout-complete.html
    cy.location('pathname').should('equal', '/checkout-complete.html')
    cy.get('.title').should('have.text', 'Checkout: Complete!')
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    // click Back Home button
    cy.getByData('back-to-products').click()
    // confirm taken back to inventory page
    cy.location('pathname').should('equal', '/inventory.html')
    cy.get('span.shopping_cart_badge').should('not.exist')
  })
})
