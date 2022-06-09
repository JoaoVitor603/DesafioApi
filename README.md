<<<<<<< HEAD

<p align="center">
  <img src="https://softdesign.com.br/wp-content/themes/bones/library/images/logotipo.svg" alt="Softdesign logo" />
</p>

# :rocket: Quickstart NodeJS + Typescript

Esse projeto foi criado utilizando o framework [express]('https://expressjs.com/pt-br/').

Esse projeto contém todos os scripts do [express]('https://expressjs.com/pt-br/') com configurações adicionais de [typescript]('https://www.typescriptlang.org/'), [eslint](https://eslint.org/), [prettier](https://prettier.io/), e [husky](https://typicode.github.io/husky/#/).

### :wink: Antes de iniciar o projeto

Verifique se o NodeJS instalado em sua máquina está na versão 14 ou superior. Digite no terminal o seguinte comando:

`$ node -v`

Caso não tenha ou esteja desatualizado, navegue até o site do nodeJS e baixe a versão mais recente.

Mais informações: [site oficial](https://nodejs.org/en/).

### :fire: Iniciando o projeto

`$ npm install` ou `$ yarn`

Quando concluir a instalação das dependências, abra o projeto no seu editor, crie um arquivo `.env` com as mesmas informações do `.env.example` é necessário popular as variáveis de acordo com o nome, senha e porta sendo utilizadas no BD postgres na máquina.

Após configurações para conectar no BD prontas. Pode rodar o comando

`$yarn seed:config`

para validação de conexão com o BD.

Para rodar as migrations e criar as tabelas no BD

`$yarn typeorm migration:run` ou `$ npm run typeorm migration:run `

Para popular o banco com o usuario admin padrão rode o comando

`$yarn seed:run`

senha padrão do usuário admin > admin
