# Partner Geolocation API

API REST para gerenciamento de parceiros com funcionalidades de busca geoespacial, permitindo encontrar o parceiro mais próximo baseado em coordenadas geográficas.

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo para construção de aplicações server-side eficientes e escaláveis
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional robusto e confiável
- **[PostGIS](https://postgis.net/)** - Extensão espacial para PostgreSQL, permitindo consultas geográficas
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript
- **[Docker](https://www.docker.com/)** - Plataforma para desenvolvimento, envio e execução de aplicações em containers

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/get-started) e Docker Compose
- [Git](https://git-scm.com/)

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd <nome-do-projeto>
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/partners_db?schema=public"
```

### 4. Inicie o banco de dados com Docker

```bash
docker-compose up -d
```

Isso irá iniciar um container PostgreSQL com a extensão PostGIS habilitada.

### 5. Execute as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Inicie a aplicação

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

## 🗄️ Estrutura do Banco de Dados

A tabela `partners` possui a seguinte estrutura:

- `id` (UUID) - Identificador único
- `trading_name` (TEXT) - Nome fantasia
- `owner_name` (TEXT) - Nome do proprietário
- `document` (TEXT) - CNPJ/CPF
- `coverage_area` (GEOMETRY) - Área de cobertura (MultiPolygon)
- `address` (GEOMETRY) - Endereço (Point)
- `created_at` (TIMESTAMP) - Data de criação

## 📡 Endpoints da API

### 1. Criar Parceiro

**POST** `/partner`

```json
{
  "tradingName": "Adega Emporio",
  "ownerName": "Ze da Silva",
  "document": "23.254.882/0001-17",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [
          [-46.80874, -23.58613],
          [-46.83603, -23.62247],
          [-46.85234, -23.65691],
          [-46.80874, -23.58613]
        ]
      ]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [-46.788303, -23.644058]
  }
}
```

### 2. Listar Todos os Parceiros

**GET** `/partner`

### 3. Buscar Parceiro por ID

**GET** `/partner/:id`

Exemplo: `GET /partner/38ad11c2-7464-427b-b14e-9093bba5a348`

### 4. Buscar Parceiro Mais Próximo

**GET** `/partner/search?long={longitude}&lat={latitude}`

Exemplo: `GET /partner/search?long=-46.788303&lat=-23.644058`

**Resposta:**

```json
{
  "id": "38ad11c2-7464-427b-b14e-9093bba5a348",
  "trading_name": "Adega Emporio",
  "owner_name": "Ze da Silva",
  "document": "23.254.882/0001-17",
  "coverage_area": "{\"type\":\"MultiPolygon\",\"coordinates\":[...]}",
  "address": "{\"type\":\"Point\",\"coordinates\":[-46.788303,-23.644058]}",
  "distance": 0,
  "created_at": "2025-12-28T02:09:54.800Z"
}
```

## 🔍 Funcionalidades Geoespaciais

A API utiliza as seguintes funções do PostGIS:

- **ST_Contains** - Verifica se um ponto está dentro da área de cobertura
- **ST_Distance** - Calcula a distância em metros entre dois pontos geográficos
- **ST_GeomFromGeoJSON** - Converte GeoJSON em geometria PostGIS
- **ST_AsGeoJSON** - Converte geometria PostGIS em GeoJSON
- **ST_SetSRID** - Define o sistema de referência espacial (SRID 4326 = WGS84)

## 🐳 Docker Compose

O arquivo `docker-compose.yml` configura:

```yaml
version: '3.8'

services:
  postgres:
    image: postgis/postgis:15-3.3
    container_name: partners_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: partners_db
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Testes
npm run test

# Prisma Studio (interface visual do banco)
npx prisma studio
```

## 🧪 Testando a API

Você pode usar ferramentas como:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (extensão VS Code)
- cURL

Exemplo com cURL:

```bash
# Criar parceiro
curl -X POST http://localhost:3000/partner \
  -H "Content-Type: application/json" \
  -d '{
    "tradingName": "Adega Teste",
    "ownerName": "João Silva",
    "document": "12.345.678/0001-90",
    "coverageArea": {
      "type": "MultiPolygon",
      "coordinates": [[[[−46.80874,−23.58613],[−46.83603,−23.62247],[−46.80874,−23.58613]]]]
    },
    "address": {
      "type": "Point",
      "coordinates": [−46.788303,−23.644058]
    }
  }'

# Buscar parceiro mais próximo
curl http://localhost:3000/partner/search?long=-46.788303&lat=-23.644058
```

## 🛠️ Troubleshooting

### Erro de conexão com o banco de dados

Verifique se o container Docker está rodando:

```bash
docker ps
```

Se não estiver, inicie novamente:

```bash
docker-compose up -d
```

### Erro "PostGIS extension not found"

Entre no container e habilite a extensão:

```bash
docker exec -it partners_db psql -U postgres -d partners_db
CREATE EXTENSION IF NOT EXISTS postgis;
\q
```

### Porta 5432 já em uso

Se você já tem PostgreSQL rodando localmente, altere a porta no `docker-compose.yml`:

```yaml
ports:
  - '5433:5432' # Muda para 5433
```

E atualize o `DATABASE_URL` no `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/partners_db?schema=public"
```

## 📚 Recursos Adicionais

- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação Prisma](https://www.prisma.io/docs/)
- [Documentação PostGIS](https://postgis.net/documentation/)
- [Especificação GeoJSON](https://geojson.org/)

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ usando NestJS e PostGIS
