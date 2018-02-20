describe('06-tabindex.js', () => {
  beforeEach(() => {
    cy.login('foobar@localhost:3000', 'foobarfoobar')
    cy.wait(500)
  })

  it('shows correct tabindex in home timeline', () => {
    cy.getNthVirtualArticle(0).should('have.attr', 'tabindex', '0')
    cy.getNthVirtualArticle(2).should('have.attr', 'tabindex', '0')
    cy.getNthVirtualArticle(3).should('have.attr', 'tabindex', '0')
  })

  it('shows correct tabindex in notifications', () => {
    cy.visit('/notifications')
    cy.wait(500)
    cy.getNthVirtualArticle(0).should('have.attr', 'tabindex', '0')
      .and('have.class', 'status-article')
    cy.getNthVirtualArticle(1).should('have.attr', 'tabindex', '0')
      .and('have.class', 'status-article')
    cy.getNthVirtualArticle(2).should('have.attr', 'tabindex', '0')
      .and('have.class', 'status-article')
    cy.getNthVirtualArticle(3).should('have.attr', 'tabindex', '0')
      .and('have.class', 'status-article')
    cy.getNthVirtualArticle(4).should('have.attr', 'tabindex', '0')
    cy.getNthVirtualArticle(4).scrollIntoView()
    cy.wait(500)
    cy.getNthVirtualArticle(5).should('have.attr', 'tabindex', '0')
      .and('have.class', 'notification-article')
    cy.getNthVirtualArticle(6).should('have.attr', 'tabindex', '0')
      .and('have.class', 'status-article')
    cy.getNthVirtualArticle(6).scrollIntoView()
    cy.wait(500)
    cy.getNthVirtualArticle(7).should('have.attr', 'tabindex', '0')
      .and('have.attr', 'aria-setsize', '8')
      .and('have.class', 'notification-article')
  })

  it('shows correct tabindex in pinned statuses', () => {
    cy.visit('/pinned')
    cy.wait(500)
    cy.get('.status-article').should('have.attr', 'tabindex', '0')
      .and('have.attr', 'aria-posinset', '0')
      .and('have.attr', 'aria-setsize', '1')
  })
})