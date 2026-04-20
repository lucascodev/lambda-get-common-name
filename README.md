# lambda-get-common-name

AWS Lambda que extrai o **Common Name (CN)** de um certificado digital no formato PEM.

## Visão Geral

Esta função recebe o conteúdo de um certificado PEM via evento e retorna o Common Name presente no campo `Subject` do certificado.

## Estrutura do Projeto

```
lambda-get-common-name/
├── index.mjs              # Handler principal da Lambda
├── package.json
└── functions/
    ├── index.mjs          # Barrel de exports
    └── getCommonName.mjs  # Lógica de leitura do certificado PEM
```

## Dependências

| Pacote    | Versão    | Descrição                             |
| --------- | --------- | ------------------------------------- |
| `aws-sdk` | ^2.1641.0 | SDK da AWS                            |
| `pem`     | ^1.14.8   | Leitura e parsing de certificados PEM |

## Instalação

```bash
npm install
```

## Uso

### Evento de entrada

```json
{
  "contentPem": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
}
```

### Resposta de sucesso (`200`)

```json
{
  "commonName": "example.com"
}
```

### Resposta de erro (`500`)

```json
{
  "error": "Mensagem de erro"
}
```

## Deploy

Faça o upload do código como arquivo `.zip` para a AWS Lambda, garantindo que o campo **Handler** esteja configurado como `index.handler` e o runtime como **Node.js (ES Modules)**.

```bash
zip -r function.zip index.mjs package.json functions/ node_modules/
```

## Variáveis de Ambiente

Nenhuma variável de ambiente é necessária para o funcionamento básico da função.

## Notas

- O campo `contentPem` deve conter o certificado em formato PEM válido.
- Caso o conteúdo PEM esteja ausente, a função lança o erro `PEM content is missing`.
