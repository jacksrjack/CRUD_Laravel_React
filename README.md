# CRUD simples com Laravel, React e Mysql


## Instalação

### Back-end

  1. `$ cd back`
  2. `$ composer install`
  3. `$ cp .env.example .env`
  4. Altere o nome e dados de acesso do seu banco de dados MYSQL editando o arquivo `.env`.
  5. `$ php artisan serve`
  
### Front-end

  1. `$ cd front`
  2. `$ npm install`
  3. `$ npm run start`
 
  
## Funcionalidades Implementadas

  1. Cadastrar um suporte com upload de imagem
  2. Listar os suportes cadastrados
  3. Editar dados de um suporte
  4. Ver e deletar um suporte
  
  
## Bibliotecas

### Front

 +  `Axios`

## Observação

+ Poderá ser necessário executar o comando `php artisan storage:link`, para dar acesso a página de upload de arquivos.