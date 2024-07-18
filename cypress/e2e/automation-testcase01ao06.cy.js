describe('Exercício de automação - Testes de Caso 01 ao 06', () => {
    
    beforeEach(() => {
        cy.visit("http://automationexercise.com") // Site para realização do desafio.
        cy.viewport(2560, 1440) // Tamanho da janela para acompanhar o resultado das linhas de código.
    });
    it('Conta em site de roupas', () => {
        
        cy.contains("Signup / Login").click() // Acessar a página de criação de conta.

        cy.get('.signup-form > h2').should("have.text", "New User Signup!") // Verificação do "New User Signup!".

        criarConta("Henrique Bastos", "henriquebastos12tt@gmail.com") // Usando a função 'Criar conta' e adicionei os respectivos dados da função.

        cy.get('.login-form > h2 > b').should("have.text", "Enter Account Information") // Verificação do "Enter Account Information".
        cy.get('#id_gender1').click() // Selecionando o gênero do usuário (optei pelo Mr.)
        
        continuarConta("556677") // Senha da conta (ainda na página de criação de conta.)

        informacoesEndereco("Arnaldo", "Batista", "Rio+", "Rua 123", "Ao lado da padaria", "Rio de Janeiro", "Vassouras", "27700-000") // Informações de endereço para continuação do cadastro.
        
        cy.get('b').should("have.text", "Account Created!") // Mensagem da criação da conta

        cy.get('[data-qa="continue-button"]').click()

        cy.get('b').should('have.text', 'Henrique Bastos') // Verificação do nome.
        
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()

        cy.get('[data-qa="login-email"]').type('henriquebastos12tt@gmail.com') // Login da conta (email)
        cy.get('[data-qa="login-password"]').type('556677') // Login da conta (senha)
        cy.get('[data-qa="login-button"]').click() // Botão de logar na conta

        cy.get(':nth-child(9) > a').click()

        cy.get('[data-qa="name"]').type('Henrique') // Nome no formulário
        cy.get('[data-qa="email"]').type('henriquebastos@gmail.com') // Email no formulário
        cy.get('[data-qa="subject"]').type('Assunto') // Assunto no formulário
        cy.get('[data-qa="message"]').type('Olá tudo bem?') // Mensagem no formulário
        cy.get('[type="file').selectFile('cypress/images/image.jpeg', { force: true });
        cy.get('[data-qa="submit-button"]').click() // Botão de enviar o formulário

        cy.get('#form-section > .btn').click() // Botão de contato

        cy.get('.shop-menu > .nav > :nth-child(4) > a').click() // Botão de logout

        cy.get('[data-qa="signup-name"]').type('Henrique Azevedo') // Tentativa criação da conta (nome)
        cy.get('[data-qa="signup-email"]').type('henriquebastos12tt@gmail.com') // Tentativa criação da conta (email)
        cy.get('[data-qa="signup-button"]').click() // Botão de criar conta
        cy.get('.signup-form > form > p').should("have.text", "Email Address already exist!") // Mensagem de aviso (não foi possível criar a conta)
        cy.get('[data-qa="signup-name"]').clear() // Apagar os dados (nome)
        cy.get('[data-qa="signup-email"]').clear() // Apagar os dados (email)

        cy.get('[data-qa="login-email"]').type('henriquebastos12tt@gmail.com') // Login da conta (email)
        cy.get('[data-qa="login-password"]').type('556677') // Login da conta (senha)
        cy.get('[data-qa="login-button"]').click() // Botão de logar na conta

        cy.get('.shop-menu > .nav > :nth-child(5) > a').click() // Botão de deletar a conta
        cy.get('[data-qa="account-deleted"]').should('be.visible') // Visibilidade do botão de deletar a conta
        cy.get('[data-qa="continue-button"]').click() // Voltando para página inicial

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
    
    cy.get('#newsletter').click()
    cy.get('#optin').click()
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