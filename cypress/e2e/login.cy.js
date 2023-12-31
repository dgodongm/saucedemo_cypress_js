import { valid_users } from '../fixtures/valid_users.json'

describe('saucedemo login spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to test loading of login page', () => {
    cy.get('#login_button_container').should('be.visible')
  })

  // generate login tests for each of the valid (that is, those that are allowed to login) canned saucedemo users
  valid_users.forEach((item) => {
    it(`Logging in with ${item.username}`, () => {
      cy.login(item.username, item.password)
      cy.get('.inventory_list').should('be.visible')
    })
  })

  it('should not be able to login with a locked user', () => {
    cy.login('locked_out_user', 'secret_sauce')
    cy.getByData('error').should(
      'have.text',
      'Epic sadface: Sorry, this user has been locked out.'
    )
  })

  it('should not be able to login with an invalid password', () => {
    cy.login('standard_user', 'invalid')
    cy.getByData('error').should(
      'have.text',
      'Epic sadface: Username and password do not match any user in this service'
    )
  })
})
