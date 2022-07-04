# Verbos API

## Informações Gerais

Verbos API é uma biblioteca com serviço de consulta de conjugações de verbo.

Ela utiliza uma base de dados de 14.516 verbos, extraída do site [Portal da Língua Portuguesa](http://www.portaldalinguaportuguesa.org/).

O projeto Verbos API é um projeto pessoal feito sem fins lucrativos, apenas com o intuito de passatempo e de aprendizado. Basicamente, ele foi criado para ser a api de consulta de um Skill da Alexa ("Consulta Verbos").

Como ele foi feito de forma despretenciosa, seu objetivo não é servir de template ou modelo para outros projetos. Mesmo porque não sofreu nenhum tipo de revisão. 

De toda forma, como autor do projeto, aceitarei de bomgrado qualquer sugestão ou melhoria.

gutoconde
gutoconde@gmail.com

## Serviços da API

Possui 2 serviços principais :

1. Listagem de verbos : retorna a lista de verbos da base de dados.
    - Exemplo : http://127.0.0.1:3000/rest/verbos

2. Consulta de conjugação de verbos: retorna a conjugação de um verbo em determinado tempo.
    - Exemplo : http://127.0.0.1:3000/rest/conjugacao/PRESENTE?verbo=sabatinar (retorna a conjugação do verbo sabatinar no tempo PRESENTE)

A seguir, a lista de tempos disponíveis :

- PRESENTE
- PRETERITO_IMPERFEITO
- PRETERITO_PERFEITO
- PRETERITO_MAIS_QUE_PERFEITO
- FUTURO_DO_PRESENTE
- FUTURO_DO_PRETERITO
- PRESENTE_DO_SUBJUNTIVO
- PRETERITO_IMPERFEITO_DO_SUBJUNTIVO
- FUTURO_DO_SUBJUNTIVO
- IMPERATIVO_AFIRMATIVO
- IMPERATIVO_NEGATIVO
- INFINITIVO_IMPESSOAL
- INFINITIVO_PESSOAL
- GERUNDIO
- PARTICIPIO_PASSADO

## Montagem/atualização da base de dados

Para montar a base de dados devemos executar os scripts sql no banco SQlite verbos/database/verbos.db na ordem abaixo:

1. verbos/database/create-database.sql
2. verbos/database/inserts-tempos-modos.sql

Para carregar o banco de dados com os verbos do [Portal da Língua Portuguesa](http://www.portaldalinguaportuguesa.org/), execute o comando a seguir a partir do diretorio verbos/api :

```
> npm run load
```

# Imagem docker :

Para executar a imagem Docker do projeto execute o comando a seguir a partir do diretório verbos (raiz do projeto):

```
> docker-compose up -d --build
```

# Implantação do projeto na AWS

Para implantar o projeto na AWS, antes de executar o comando de deploy, é necessário instalar a ferramenta `serverless` da AWS e setar as seguintes variáveis de ambiente:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

Para executar o deploy na AWS, execute o comando abaixo, a partir do diretório verbos/api:

```
> sls deploy
```

