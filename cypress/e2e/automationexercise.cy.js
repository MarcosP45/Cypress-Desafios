/// <reference types="cypress-downloadfile"/>
describe('', () => {

    beforeEach(() => {
        cy.visit("https://automationexercise.com/")
        cy.viewport(1280, 720)
    });
    it.skip('Ver carrinho de produtos da marca', () => {
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click()

        cy.get('.brands_products').should('be.visible')
        cy.get('.brands-name > .nav > :nth-child(1) > a').click()
        cy.get('.title').should('be.visible')

        cy.get('.brands-name > .nav > :nth-child(3) > a').click()
        cy.get('.title').should('be.visible')
    });
    it.skip('Procurar produtos e verificar o carrinho após o cadastro', () => {
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click()
        cy.get('.title').should('be.visible')
        cy.get('#search_product').type('Winter')
        cy.get('#submit_search').click()

        cy.get('.productinfo > .btn').click()
        cy.get('u').click()
        cy.get('#cart_items > :nth-child(1)').should('be.visible')

        cy.contains("Signup / Login").click() // Acessar a página de criação de conta.
        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".
        criarConta("Erick Aspas", "aspaszin@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.
        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)
        informacoesEndereco("Arnaldo", "Batista", "Rio+", "Rua 1234", "Ao lado da padaria", "Rio de Janeiro", "Rio de Janeiro", "27700-001") // Informações de endereço para continuação do cadastro.
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta
        cy.get('[data-qa="continue-button"]').click() // Click do continue da página de criação de conta

        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.get('#cart_items > :nth-child(1)').should('be.visible')

        cy.get('.shop-menu > .nav > :nth-child(5) > a').click() // Deletar conta
        cy.get('[data-qa="continue-button"]').click() // Deletar conta (botão de continuar)
    });
    it.skip('Adicionar uma review ao produto', () => {
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click()
        cy.get(':nth-child(7) > .product-image-wrapper > .choose > .nav > li > a').click()

        cy.get('.category-tab > :nth-child(1) > .nav').should('be.visible')
        cy.get('#name').type('Erick')
        cy.get('#email').type('aspaszin@gmail.com')
        cy.get('#review').type('produto muito bom!')
        cy.get('#button-review').click()
        cy.get('.alert-success > span').should('be.visible')
    });
    it.skip('Adicionar ao carrinho os produtos recomendados', () => {
        cy.scrollTo('bottom')
        cy.get('.recommended_items > .title').should('be.visible')
        cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.get('#cart_info').should('be.visible')
    });
    it.skip('Verificação do endereço na página de checkout', () => {
        cy.contains("Signup / Login").click() // Acessar a página de criação de conta.
        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".
        criarConta("Erick Aspas", "aspaszin@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.
        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)
        informacoesEndereco("Arnaldo", "Batista", "Rio+", "Rua 1234", "Ao lado da padaria", "Rio de Janeiro", "Rio de Janeiro", "27700-001") // Informações de endereço para continuação do cadastro.
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta
        cy.get('[data-qa="continue-button"]').click() // Click do continue da página de criação de conta

        cy.get('b').should("have.text", 'Erick Aspas')

        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.get('#cart_items > :nth-child(1)').should('be.visible')
        cy.get('.col-sm-6 > .btn').click()

        cy.get('#address_delivery').then(confirmarEndereco)

        cy.get(':nth-child(5) > a').click() // Deletar conta
        cy.get('b').should('have.text', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    });
    it('Download do arquivo "invoice" após a compra', () => {
        cy.get('#slider-carousel > .carousel-inner').should('be.visible')
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.get('.col-sm-6 > .btn').click()
        cy.get('.modal-body > :nth-child(2) > a > u').click()

        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".
        criarConta("Erick Aspas", "aspaszin@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.
        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)
        informacoesEndereco("Arnaldo1", "Batista1", "Rio+1", "Rua 1234", "Ao lado da padaria1", "Rio de Janeiro1", "Vassouras1", "27700-001") // Informações de endereço para continuação do cadastro.
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta
        cy.get('[data-qa="continue-button"]').click() // Click do continue da página de criação de conta

        cy.get('b').should("have.text", 'Erick Aspas')
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.get('.col-sm-6 > .btn').click()
        cy.get('#address_delivery').should('be.visible')
        cy.get('#product-2').should('be.visible')
        cy.get('.form-control').type('O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500')
        cy.get(':nth-child(7) > .btn').click()

        cy.get('[data-qa="name-on-card"]').type('Erick Aspas')
        cy.get('[data-qa="card-number"]').type('135123215213')
        cy.get('[data-qa="cvc"]').type('311')
        cy.get('[data-qa="expiry-month"]').type('05')
        cy.get('[data-qa="expiry-year"]').type('1997')
        cy.get('[data-qa="pay-button"]').click()

        cy.get('.col-sm-9 > .btn-default').should('be.visible')
        cy.downloadFile('https://automationexercise.com/download_invoice/500', 'cypress/downloads/', 'invoice.txt')
        cy.readFile('cypress/downloads/invoice.txt').should('contain', 'Hi Arnaldo1 Batista1, Your total purchase amount is 500. Thank you')
        cy.log('Invoice has been downloaded successfully!')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
        cy.get('b').should('have.text', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    });
    it.skip('Verificação da funcionalidade do "ScrollUp" com a utilização do botão', () => {
        cy.scrollTo('bottom')
        cy.get('.single-widget > h2').should('be.visible')
        cy.get('#scrollUp > .fa').click()
        cy.get('.active > :nth-child(1) > h2').should('be.visible')
    });
    it.skip('Verificação da funcionalidade do "ScrollUp" e do "ScrollDown" sem o uso do botão', () => {
        cy.scrollTo('bottom')
        cy.get('.single-widget > h2').should('be.visible')
        cy.scrollTo('top')
        cy.get('.active > :nth-child(1) > h2').should('be.visible')
    });
});
function criarConta(nome, email) { // 1ª Etapa da criação da conta (ainda na página onde ocorreu a verificação de "New User".)
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
}
function continuarConta(senha) { // 2ª Etapa da criação da conta (agora na página onde pede outros dados para completar o cadastro.)
    cy.get('[data-qa="password"]').type(senha)
    cy.get('[data-qa="days"]').select('6');
    cy.get('[data-qa="months"]').select('November');
    cy.get('[data-qa="years"]').select('1996');
    cy.get('#newsletter').click() // Marcando a checkbox
    cy.get('#optin').click() // Marcando a checkbox
}
function informacoesEndereco(nome, sobrenome, empresa, endereco, complemento,estado, cidade, cep) { // Informações do endereço (necessários para o 'recebimento' dos produtos.)
    cy.get('[data-qa="first_name"]').type(nome)
    cy.get('[data-qa="last_name"]').type(sobrenome)
    cy.get('[data-qa="company"]').type(empresa)
    cy.get('[data-qa="address"]').type(endereco)
    cy.get('[data-qa="address2"]').type(complemento)
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type(estado)
    cy.get('[data-qa="city"]').type(cidade)
    cy.get('[data-qa="zipcode"]').type(cep)
    cy.get('[data-qa="mobile_number"]').type('(99)99999-9999')
    cy.contains('button', 'Create Account').click()
}
function confirmarEndereco() {
    cy.contains('Mr. Arnaldo Batista').should('be.visible')
    cy.contains('Rio+').should('be.visible')
    cy.contains('Rua 1234').should('be.visible')
    cy.contains('Ao lado da padaria').should('be.visible')
    cy.contains('Rio de Janeiro Rio de Janeiro 27700-001').should('be.visible')
    cy.contains('Canada').should('be.visible')
    cy.contains('(99)99999-9999').should('be.visible')
}