# lambda-get-common-name

AWS Lambda que extrai o **Common Name (CN)** de um certificado digital no formato PEM.

## Visão Geral

Esta função recebe o conteúdo de um certificado PEM via evento e retorna o Common Name (campo `Subject CN`) do certificado. O tratamento de erros é centralizado no handler, garantindo que respostas HTTP reflitam corretamente o estado real da operação.

## Estrutura do Projeto

```
lambda-get-common-name/
├── index.mjs              # Handler principal da Lambda
├── package.json
└── functions/
    ├── index.mjs          # Barrel de exports
    └── getCommonName.mjs  # Lógica de leitura do certificado PEM
```

## Pré-requisitos

- Node.js >= 18
- AWS Lambda com runtime **Node.js 18.x** ou superior (ES Modules habilitado via `"type": "module"`)

## Dependências

| Pacote | Versão  | Descrição                             |
| ------ | ------- | ------------------------------------- |
| `pem`  | ^1.14.8 | Leitura e parsing de certificados PEM |

> `aws-sdk` não é necessário — não há chamadas a serviços AWS nesta função.

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

Erros são propagados pelo handler e retornam:

```json
{
  "error": "Mensagem de erro"
}
```

**Erros possíveis:**

| Cenário                          | Mensagem                       |
| -------------------------------- | ------------------------------ |
| Campo `contentPem` ausente       | `PEM content is missing`       |
| Conteúdo PEM inválido/corrompido | `Error reading PEM: <detalhe>` |

## Deploy

Configure o **Handler** como `index.handler` e o runtime como **Node.js 18.x** (ou superior).

```bash
# Instalar dependências de produção
npm install --omit=dev

# Gerar pacote de deploy
zip -r function.zip index.mjs package.json functions/ node_modules/
```

Em seguida, faça o upload do `function.zip` via Console AWS ou AWS CLI:

```bash
aws lambda update-function-code \
  --function-name lambda-get-common-name \
  --zip-file fileb://function.zip
```

## Variáveis de Ambiente

Nenhuma variável de ambiente é necessária para o funcionamento desta função.

## Fluxo de Execução

```
Evento Lambda
    └── handler (index.mjs)
            └── getCommonName(contentPem)
                    ├── Valida presença do PEM
                    ├── Lê o certificado via pem.readCertificateInfo()
                    └── Retorna certInfo.commonName
```
