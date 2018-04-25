// https://docs.cypress.io/api/introduction/api.html

describe('Home Page Test', () => {
  it('Visits The Home Page', () => {
    cy.visit('/home/profile')
    cy.wait(2000)
    cy.contains('div.bio', '谁终将声震人间，必长久深自缄默；谁终将点燃闪电，必长久如云漂泊')
    cy.get('div.app-bubbly-button').click()
  })
})
