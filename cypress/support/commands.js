// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-test=${selector}]`)
})

let userCookie
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.getByData('username').type(username)
  cy.getByData('password').type(password, { log: false })
  cy.getByData('login-button').click()
  //   cy.location('pathname').should('equal', '/inventory.html')

  //   if (userCookie) {
  //     cy.setCookie('session-username', userCookie.value, userCookie)
  //     cy.visit('/inventory.html')
  //     cy.location('pathname').should('equal', '/inventory.html')
  //   } else {
  //     cy.log('**log in**')
  //     cy.visit('/')
  // cy.getByData('username').type(username)
  // cy.getByData('password').type(password)
  // cy.getByData('login-button').click()
  //     cy.location('pathname').should('equal', '/inventory.html')
  //     cy.getCookie('session-username')
  //       .should('exist')
  //       .then((c) => {
  //         userCookie = c
  //       })
  //   }
  //   cy.session(
  //     [username, password],
  //     () => {
  //       cy.visit('/')
  //       cy.getByData('username').type(username)
  //       cy.getByData('password').type(password)
  //       cy.getByData('login-button').click()
  //       cy.location('pathname').should('equal', '/inventory.html')
  //     },
  //     {
  //       validate() {
  //         cy.log('**validate login session**')
  //         cy.getCookie('session-username').should('exist')
  //       },
  //     }
  //   )
})
