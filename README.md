![visitors](https://visitor-badge.laobi.icu/badge?page_id=christianebs.projeto-testes-automatizados-js) ![GitHub Repo stars](https://img.shields.io/github/stars/christianebs/projeto-testes-automatizados-js) ![GitHub pull requests](https://img.shields.io/github/issues-pr/christianebs/projeto-testes-automatizados-js) ![GitHub closed issues](https://img.shields.io/github/issues-closed/christianebs/projeto-testes-automatizados-js)

# Teste Automatizado de Autenticação de Usuário

O projeto consiste em uma aplicação Node.js que oferece endpoints para autenticação de usuários e manipulação de informações de usuários. Utilizando o Express.js como framework web e o Mongoose para integração com o MongoDB, a aplicação permite criar novos usuários, autenticar usuários existentes e fornecer um token JWT para autenticação em requisições futuras. Além disso, são fornecidos endpoints protegidos por middleware de autenticação que exigem o uso de token JWT válido para acesso. A aplicação é modular, seguindo uma estrutura MVC, com controllers, serviços, middlewares e rotas claramente separados para facilitar a manutenção e os testes automatizados.

## :woman_mechanic: Linguagens e Ferramentas

![JavaScript](https://img.shields.io/badge/javascript-0D1117.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Jest](https://img.shields.io/badge/-jest-0D1117?style=for-the-badge&logo=jest&logoColor=%23C21325) ![Express.js](https://img.shields.io/badge/express.js-0D1117.svg?style=for-the-badge&logo=express&logoColor=%23404d59) ![MongoDB](https://img.shields.io/badge/MongoDB-0D1117.svg?style=for-the-badge&logo=mongodb&logoColor=%234ea94b) ![JWT](https://img.shields.io/badge/JWT-0D1117?style=for-the-badge&logo=JSON%20web%20tokens) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0D1117.svg?style=for-the-badge&logo=visual-studio-code&logoColor=0078d7) ![Git](https://img.shields.io/badge/git-0D1117.svg?style=for-the-badge&logo=git&logoColor=%23F05033) ![GitHub](https://img.shields.io/badge/github-0D1117.svg?style=for-the-badge&logo=github&logoColor=white)

## :triangular_flag_on_post: Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

git clone https://github.com/christianebs/projeto-testes-automatizados-js/

# 2. Instale as dependências

npm install
```

```shell
# Configure o .env para conseguir rodar o projeto

PORT=
SECRET_KEY=
MONGO_DB_URL=
```

Observações:

- As dependências estão definidas no arquivo package.json. Ao executar **npm install**, todas elas serão instaladas 
- O arquivo package.json já contém a configuração necessária na seção de scripts:
- Não é necessário inicializar um novo projeto Node.js com **npm init -y**, pois ao clonar o repositório, você já terá um package.json configurado.

## :card_file_box: Fucionalidades do Projeto

- [x] **Cadastro de Usuário**: Permite que novos usuários se cadastrem na aplicação fornecendo um nome, um e-mail válido e uma senha.

- [x] **Autenticação de Usuário**: Possibilita que usuários autentiquem-se na aplicação através do fornecimento de um e-mail válido e uma senha correspondente.

- [x] **Geração de Token JWT**: Após a autenticação bem-sucedida, a aplicação gera um token JWT que é retornado ao cliente. Esse token pode ser usado para autenticar futuras requisições e acessar endpoints protegidos.

- [x] **Mudança de Senha**: Fornecendo um token JWT válido, os usuários podem solicitar a mudança de sua senha.

- [x] **Validação de E-mail**: Antes de cadastrar um novo usuário ou autenticar um usuário existente, a aplicação valida se o e-mail fornecido está em um formato válido.

- [x] **Proteção de Rotas**: Alguns endpoints da aplicação são protegidos por um middleware de autenticação. Isso significa que o acesso a essas rotas só é permitido se o cliente fornecer um token JWT válido.

## :twisted_rightwards_arrows: Testes realizados

#### **End-to-End (e2e) Tests**

- [x] **session.test.js - Testes do Controller de Sessão:**

- **CREATE SESSION:**
    - Retorna status 400 quando um email válido não é passado.
    - Retorna status 400 quando uma senha válida não é passada.
    - Retorna status 404 quando o usuário não é encontrado.
    - Retorna status 200 quando uma sessão é criada com sucesso.

- [x] **user.test.js - Testes do Controller de Usuário:**

- **CREATE USER:**
    - Retorna status 200 quando um novo usuário é criado com sucesso.
    - Retorna status 400 quando um email válido não é passado.
    - Retorna status 400 quando uma senha válida não é passada.

- **CHANGE PASSWORD:**
    - Retorna status 401 quando a senha é atualizada sem credenciais.
    - Retorna status 200 quando a senha é atualizada com sucesso.

#### **Integração**

- [x] **integration-user-ctrl.test.js - Testes de Integração do Controller de Usuário:**
    - Retorna status 200 para um novo usuário criado no banco de dados.
    - Retorna status 400 se o email é inválido.
    - Retorna status 400 se a senha não é fornecida.

#### **Unitários**

- [x]  **Controllers**

    - [x] **session-ctrl.test.js - Testes do Controller de Sessão:**

    - Retorna status 200 para um novo token gerado.
    - Retorna status 400 se o email é inválido.
    - Retorna status 400 se a senha não é fornecida.
    - Retorna status 404 se o usuário não é encontrado.
    - Retorna status 500 para erro interno do servidor.

    - [x] **user-ctrl.test.js - Testes do Controller de Usuário:**

    - Retorna status 200 para um novo usuário criado.
    - Retorna status 400 se a senha não é fornecida.
    - Retorna status 400 se o email é inválido.
    - Retorna status 500 para erro interno do servidor.
    - Retorna status 200 se a senha é alterada com sucesso.

- [x] **Services**

    - [x] **session-service.test.js - Testes do Serviço de Sessão:**

    - Gera um token com payload e opções corretas.
    - jwt.sign é chamado uma vez.

    - [x] **user-service.test.js - Testes do Serviço de Usuário:**

    - Retorna um ID quando um novo usuário é criado.
    - Não rejeita a operação se já existir um usuário no banco de dados com o mesmo email.
    - Verifica se um usuário existe e a senha está correta.
    - Retorna falso se o usuário não existe.
    - Lança um erro se a senha está incorreta.

- [x] **Utils**

    - [x] **email-validator.test.js - Testes do Validador de Email:**

    - Retorna falso para email vazio.
    - Retorna falso para formato de email inválido.
    - Retorna verdadeiro para formato de email válido.

## :white_check_mark: Resultado dos Testes

![Testes-Automatizados-Projeto](https://github.com/christianebs/projeto-testes-automatizados-js/assets/108686840/9e83d640-3464-4ed3-b90c-cdda9b49e3ac)

## :woman_technologist: :man_technologist: Desenvolvedores

| [<img src="https://avatars.githubusercontent.com/u/118940939?v=4" width=115><br><sub>Bruno Lopes</sub>](https://github.com/brunoLopes-dev) | [<img src="https://user-images.githubusercontent.com/108686840/271874870-1003d6c2-7574-4104-a392-ab6b2713cff2.png" width=115><br><sub>Christiane Barbosa</sub>](https://github.com/christianebs) | [<img src="https://avatars.githubusercontent.com/u/56234707?v=4" width=115><br><sub>João Marcos</sub>](https://github.com/joaomcsferreira) | [<img src="https://avatars.githubusercontent.com/u/134095546?v=4" width=115><br><sub>Marília Pinheiro Alves</sub>](https://github.com/MariliaPinheiroAlves) | [<img src="https://avatars.githubusercontent.com/u/141584350?v=4" width=115><br><sub>Patrick Farias</sub>](https://github.com/patrickfariaslima) |
| :----------------------------------------------------------------------------------------------------------------------------------: |  :----------------------------------------------------------------------------------------------------------------------------------: |  :----------------------------------------------------------------------------------------------------------------------------------: |  :----------------------------------------------------------------------------------------------------------------------------------: |  :----------------------------------------------------------------------------------------------------------------------------------: | 
