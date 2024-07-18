describe('Exercício de automação - Testes de Caso 13 ao 18', () => {
    
    beforeEach(() => {
        cy.visit("http://automationexercise.com") // Site para realização do desafio.
        cy.viewport(2560, 1440) // Tamanho da janela para acompanhar o resultado das linhas de código.
    });
    it('Verificar quantidade de produtos no carrinho', () => {
        
        cy.contains("Signup / Login").click() // Acessar a página de criação de conta.
        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".
        criarConta("Henrique Bastos", "henriquebastosnovo2@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.
        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)
        informacoesEndereco("Arnaldo", "Batista", "Rio+", "Rua 123", "Ao lado da padaria", "Rio de Janeiro", "Vassouras", "27700-000") // Informações de endereço para continuação do cadastro.
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta
        cy.get('[data-qa="continue-button"]').click() // Click do continue da página de criação de conta

        cy.get(':nth-child(11) > .product-image-wrapper > .choose > .nav > li > a').click()
        cy.get('.product-information').should('be.visible')
        cy.get('#quantity').clear()
        cy.get('#quantity').type('4')
        cy.get(':nth-child(5) > .btn').click()
        cy.get('u').click()
        cy.get('.disabled').should("have.text", "4")
    });
    it('Registrar a conta enquanto finalizo a compra', () => {
        cy.get('#slider-carousel > .carousel-inner').should('be.visible')
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.get('.col-sm-6 > .btn').click()
        cy.get('.modal-body > :nth-child(2) > a > u').click()

        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".
        criarConta("Jorge Gonçalves", "jorgegon@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.
        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)
        informacoesEndereco("Arnaldo1", "Batista1", "Rio+1", "Rua 1234", "Ao lado da padaria1", "Rio de Janeiro1", "Vassouras1", "27700-001") // Informações de endereço para continuação do cadastro.
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta
        cy.get('[data-qa="continue-button"]').click() // Click do continue da página de criação de conta

        cy.get('b').should("have.text", 'Jorge Gonçalves')
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.get('.col-sm-6 > .btn').click()
        cy.get('#address_delivery').should('be.visible')
        cy.get('#product-2').should('be.visible')
        cy.get('.form-control').type('loremO Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500')
        cy.get(':nth-child(7) > .btn').click()

        cy.get('[data-qa="name-on-card"]').type('Jorge Gonçalves')
        cy.get('[data-qa="card-number"]').type('135123215213')
        cy.get('[data-qa="cvc"]').type('311')
        cy.get('[data-qa="expiry-month"]').type('05')
        cy.get('[data-qa="expiry-year"]').type('1997')
        cy.get('[data-qa="pay-button"]').click()

        cy.get('[data-qa="order-placed"] > b').should('be.visible')
        cy.get(':nth-child(5) > a').click()
    });
    it('Registrar antes da compra', () => {
        cy.contains("Signup / Login").click() // Acessar a página de criação de conta.
        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".
        criarConta("Eick Aspas", "aspaszin@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.
        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)
        informacoesEndereco("Arnaldo", "Batista", "Rio+", "Rua 1234", "Ao lado da padaria", "Rio de Janeiro", "Rio de Janeiro", "27700-001") // Informações de endereço para continuação do cadastro.
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta
        cy.get('[data-qa="continue-button"]').click() // Click do continue da página de criação de conta

        cy.get('b').should("have.text", 'Eick Aspas') // Veroficação do nome de usuário
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.get('#cart_items > :nth-child(1)').should('be.visible')
        cy.get('.col-sm-6 > .btn').click()
        cy.get('#address_delivery').should('be.visible')
        cy.get('#product-1').should('be.visible')
        cy.get('.form-control').type('O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500')
        cy.get(':nth-child(7) > .btn').click()

        cy.get('[data-qa="name-on-card"]').type('Eick Aspas')
        cy.get('[data-qa="card-number"]').type('135123215213')
        cy.get('[data-qa="cvc"]').type('311')
        cy.get('[data-qa="expiry-month"]').type('05')
        cy.get('[data-qa="expiry-year"]').type('1997')
        cy.get('[data-qa="pay-button"]').click()

        cy.get('[data-qa="order-placed"] > b').should('be.visible')
        cy.get(':nth-child(5) > a').click()  
    });
    it('Logar antes da compra', () => {
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        cy.get('[data-qa="login-email"]').type('henriquebastosnovo2@gmail.com')
        cy.get('[data-qa="login-password"]').type('556677')
        cy.get('[data-qa="login-button"]').click()
        cy.get('b').should("have.text", 'Henrique Bastos')

        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.get('#cart_items > :nth-child(1)').should('be.visible')
        cy.get('.col-sm-6 > .btn').click()
        cy.get('#address_delivery').should('be.visible')
        cy.get('#product-1').should('be.visible')
        cy.get('.form-control').type('O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500')
        cy.get(':nth-child(7) > .btn').click()

        cy.get('[data-qa="name-on-card"]').type('Henrique Bastos')
        cy.get('[data-qa="card-number"]').type('135123215213')
        cy.get('[data-qa="cvc"]').type('311')
        cy.get('[data-qa="expiry-month"]').type('05')
        cy.get('[data-qa="expiry-year"]').type('1997')
        cy.get('[data-qa="pay-button"]').click()

        cy.get('[data-qa="order-placed"] > b').should('be.visible')
        cy.get(':nth-child(5) > a').click()
    });
    it('Remover produtos do carrinho', () => {
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.get('#cart_items > :nth-child(1)').should('be.visible')
        cy.get('.cart_quantity_delete').click()
        cy.get('.text-center > b').should("have.text", 'Cart is empty!')
    });
    it('Visualizar categoria dos produtos', () => {
        cy.get('#accordian').should('be.visible')
        cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click()
        cy.get('#Women > .panel-body > ul > :nth-child(2) > a').click()
        cy.get('.title').should("have.text", 'Women - Tops Products')
        cy.get(':nth-child(2) > .panel-heading > .panel-title > a').click()
        cy.get('#Men > .panel-body > ul > :nth-child(1) > a').click()
        cy.get('.title').should("have.text", 'Men - Tshirts Products')
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