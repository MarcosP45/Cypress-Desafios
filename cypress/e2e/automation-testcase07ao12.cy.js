describe('Exercício de automação - Testes de Caso 07 ao 12', () => {
    
    beforeEach(() => {
        cy.visit("http://automationexercise.com") // Site para realização do desafio.
        cy.viewport(2560, 1440) // Tamanho da janela para acompanhar o resultado das linhas de código.
    });
    it('Conta em site de roupas', () => {
        
        cy.contains("Signup / Login").click() // Acessar a página de criação de conta.
        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".
        criarConta("Henrique Bastos", "henriquebastosnovo2@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.
        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)
        informacoesEndereco("Arnaldo", "Batista", "Rio+", "Rua 123", "Ao lado da padaria", "Rio de Janeiro", "Vassouras", "27700-000") // Informações de endereço para continuação do cadastro.
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta
        cy.get('[data-qa="continue-button"]').click() // Click do continue da página de criação de conta

        cy.get('.active > :nth-child(1) > .test_cases_list > .btn').click() // Clicando no botão de "Test Cases"
        cy.get('.title > b').should("have.text", "Test Cases") // Verificação da página (casos de teste)

        cy.get('.shop-menu > .nav > :nth-child(2) > a').click() // Botão da aba de "Products"
        cy.get('.title').should("have.text", "All Products") // Verificação da página (de produtos)
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click() // Botão de "View Product"

        cy.get('.product-information > h2').should("have.text", "Blue Top") // Nome do produto
        cy.get('.product-information > :nth-child(3)').should("have.text", "Category: Women > Tops") // Categoria do produto
        cy.get(':nth-child(5) > span').should("have.text", "Rs. 500") // Valor do produto
        cy.get(':nth-child(6) > b').should("have.text", "Availability:") // Estoque
        cy.get(':nth-child(7) > b').should("have.text", "Condition:") // Condição
        cy.get(':nth-child(8) > b').should("have.text", "Brand:") // Marca

        cy.get('.shop-menu > .nav > :nth-child(2) > a').click() // Botão da aba de produtos
        cy.get('#search_product').type('Blue Top') // Digitando o produto de escolha
        cy.get('#submit_search').click() // Clickando para procurar o produto

        cy.get('.title').should("have.text", "Searched Products") // Verificação se chegou na página dos produtos pesquisados
        cy.get('.productinfo > p').should("have.text", "Blue Top") // Verificação se o produto pesquisado aparece na aba

        cy.get('.single-widget > h2').should("have.text", "Subscription") // Verificação se chegou na seção
        cy.get('#susbscribe_email').type('henriquebastosnovo2@gmail.com') // Colocando o email na seção de "Subscription"
        cy.get('#subscribe').click() // Clickando no botão para enviar

        cy.get('.alert-success').should("have.text", "You have been successfully subscribed!") // Verificação do envio do "Subscription"

        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()

        cy.get('h2').should("have.text", "Subscription") // Verificação se chegou na seção
        cy.get('#susbscribe_email').type('henriquebastosnovo2@gmail.com') // Colocando o email na seção de "Subscription"
        cy.get('#subscribe').click() // Clickando no botão para enviar

        cy.get('.alert-success').should("have.text", "You have been successfully subscribed!") // Verificação do envio do "Subscription"

        cy.get('.shop-menu > .nav > :nth-child(2) > a').click() // Botão da aba de produtos
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('.modal-footer > .btn').click()
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()

        cy.get('#product-1 > .cart_description > h4 > a').should("have.text" , "Blue Top") // Confirmando os dados no carrinho (Nome)
        cy.get('#product-1 > .cart_price > p').should("have.text", "Rs. 500") // Confirmando os dados no carrinho (Preço)
        cy.get('#product-1 > .cart_quantity > .disabled').should("have.text", "1") // Confirmando os dados no carrinho (Quantidade)
        cy.get('#product-1 > .cart_total > .cart_total_price').should("have.text", "Rs. 500") // Confirmando os dados no carrinho (Valor total)

        cy.get('#product-2 > .cart_description > h4 > a').should("have.text", "Men Tshirt") // Confirmando os dados no carrinho (Nome)
        cy.get('#product-2 > .cart_price > p').should("have.text", "Rs. 400") // Confirmando os dados no carrinho (Preço)
        cy.get('#product-2 > .cart_quantity > .disabled').should("have.text", "1") // Confirmando os dados no carrinho (Quantidade)
        cy.get('#product-2 > .cart_total > .cart_total_price').should("have.text", "Rs. 400") // Confirmando os dados no carrinho (Valor total)

        cy.get(':nth-child(5) > a').click() // Deletar a conta
        cy.get('[data-qa="continue-button"]').click() // Voltar para página inicial

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