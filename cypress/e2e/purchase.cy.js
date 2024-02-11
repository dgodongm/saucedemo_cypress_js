import { valid_products } from '../fixtures/valid_products'
import { faker } from '@faker-js/faker'

describe('saucedemo purchase spec', () => {
  const verifyCartPage = (productIndices) => {
    cy.log('verifyCartPage')
    cy.location('pathname').should('equal', '/cart.html')
    cy.get('.cart_item')
      .should('have.length', productIndices.length)
      .each((item, index) => {
        cy.wrap(item).within(() => {
          cy.get('.cart_quantity').should('have.text', '1')
          cy.get('.inventory_item_name').should(
            'have.text',
            valid_products[productIndices[index]].name
          )
          cy.get('.inventory_item_price').should(
            'have.text',
            '$' + valid_products[productIndices[index]].price.toString()
          )
        })
      })
  }

  const verifyCheckoutConfirmation = (productIndices) => {
    cy.log('veryCheckoutConfirmation')
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    cy.get('.cart_item').should('have.length', productIndices.length)
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
    const selectedProducts = valid_products.filter((item, index) => {
      if (productIndices.includes(index)) return true
      return false
    })
    const subTotal = selectedProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    )
    cy.get('.summary_subtotal_label').should(
      'have.text',
      'Item total: $' + subTotal
    )
    let orderTax = subTotal * 0.08
    let orderTotal = subTotal + orderTax
    cy.get('.summary_tax_label').should(
      'have.text',
      'Tax: $' + orderTax.toFixed(2).toString()
    )
    cy.get('.summary_total_label').should(
      'have.text',
      'Total: $' + orderTotal.toFixed(2).toString()
    )
  }

  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('should be able to purchase a single item', () => {
    const randomIndices = [faker.number.int(5)]
    // add item to cart
    cy.log(valid_products[randomIndices[0]].add_selector)
    cy.getByData(
      `${Cypress.$.escapeSelector(
        valid_products[randomIndices[0]].add_selector
      )}`
    ).click()
    // cart icon shows 1 item icon
    // click cart icon to initiate purchase flow
    cy.get('span.shopping_cart_badge').should('have.text', '1').click()
    // cart shows expected item; on page cart.html
    verifyCartPage(randomIndices)

    // click Checkout button to proceed
    cy.get('[data-test="checkout"]').click()
    // expect name and zip form to show; on page checkout-step-one.html
    cy.location('pathname').should('equal', '/checkout-step-one.html')
    // enter valid first/last and zip, then click Continue button
    cy.getByData('firstName').type(faker.person.firstName())
    cy.getByData('lastName').type(faker.person.lastName())
    cy.getByData('postalCode').type(faker.location.zipCode())
    cy.getByData('continue').click()

    // confirm checkout overview shows with item/payment info/shipping info/price total; on page checkout-step-two.html
    verifyCheckoutConfirmation(randomIndices)

    // click Finish button
    cy.getByData('finish').click()
    // complete page shows with Thank you text; on page checkout-complete.html
    cy.location('pathname').should('equal', '/checkout-complete.html')
    cy.get('.title').should('have.text', 'Checkout: Complete!')
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')

    // click Back Home button
    cy.getByData('back-to-products').click()
    // confirm taken back to inventory page and cart empty
    cy.location('pathname').should('equal', '/inventory.html')
    cy.get('span.shopping_cart_badge').should('not.exist')
  })

  it('should be able to purchase multiple items', () => {
    const productsToSelect = []
    for (const [index, item] of valid_products.entries()) {
      if (faker.datatype.boolean()) {
        productsToSelect.push(index)
        if (productsToSelect.length === 3) break
      }
    }
    cy.log(productsToSelect)

    // add items to cart
    productsToSelect.forEach((item) => {
      cy.getByData(
        `${Cypress.$.escapeSelector(valid_products[item].add_selector)}`
      ).click()
    })
    // cart icon shows correct count in icon
    // click cart icon to initiate purchase flow
    cy.get('span.shopping_cart_badge')
      .should('have.text', productsToSelect.length.toString())
      .click()
    // cart shows expected item; on page cart.html
    verifyCartPage(productsToSelect)

    // click Checkout button to proceed
    cy.get('[data-test="checkout"]').click()
    // expect name and zip form to show; on page checkout-step-one.html
    cy.location('pathname').should('equal', '/checkout-step-one.html')
    // enter valid first/last and zip, then click Continue button
    cy.getByData('firstName').type(faker.person.firstName())
    cy.getByData('lastName').type(faker.person.lastName())
    cy.getByData('postalCode').type(faker.location.zipCode())
    cy.getByData('continue').click()

    // confirm checkout overview shows with item/payment info/shipping info/price total; on page checkout-step-two.html
    verifyCheckoutConfirmation(productsToSelect)

    // click Finish button
    cy.getByData('finish').click()
    // complete page shows with Thank you text; on page checkout-complete.html
    cy.location('pathname').should('equal', '/checkout-complete.html')
    cy.get('.title').should('have.text', 'Checkout: Complete!')
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')

    // click Back Home button
    cy.getByData('back-to-products').click()
    // confirm taken back to inventory page and cart empty
    cy.location('pathname').should('equal', '/inventory.html')
    cy.get('span.shopping_cart_badge').should('not.exist')
  })
})
