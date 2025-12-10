# Playwright GraphQL API Testing

TypeScript-based GraphQL API testing framework using Playwright for the GoREST API.

## Quick Start

```bash
# Install dependencies
npm install
npx playwright install

# Configure
cp .env.example .env
# Add your token from https://gorest.co.in/

# Run tests
npm test
```

## Features

- Full CRUD operations testing (Users, Posts, Todos)
- JSON Schema validation with AJV
- Cursor-based pagination testing
- Bearer token authentication
- Reusable GraphQL client wrapper
- CI/CD ready with GitHub Actions

## Project Structure

```
├── constants/       # GraphQL queries & mutations
├── fixtures/        # Test fixtures
├── schemas/         # JSON validation schemas
├── tests/          # Test specs
├── types/          # TypeScript definitions
└── utils/          # GraphQL client & validators
```

## Test Coverage

**Users**: Query, create, update, delete, validation  
**Posts**: Full CRUD with pagination  
**Todos**: Create, update, delete  
**Pagination**: Cursor-based navigation  
**Errors**: Invalid queries, missing fields, validation

## Commands

```bash
npm test              # Run all tests
npm run test:ui       # Interactive UI mode
npm run test:headed   # See browser
npm run test:debug    # Debug mode
npm run report        # View HTML report
npm run lint          # Check code quality
```

## Usage Example

```typescript
import { createGraphQLClient } from './utils/graphqlClient';
import { Queries } from './constants/queries';

const client = createGraphQLClient(request);

// Query
const response = await client.query<{ users: Connection<User> }>(
  Queries.GET_USERS,
  { first: 10 }
);

// Mutation
const created = await client.mutation<{ createUser: { user: User } }>(
  Mutations.CREATE_USER,
  { input: userData }
);
```

## Configuration

Set these in `.env`:
```
GOREST_TOKEN=your_token_here
BASE_URL=https://gorest.co.in
GRAPHQL_ENDPOINT=/public/v2/graphql
```

## API Reference

- GoREST API: https://gorest.co.in/
- GraphQL Schema: https://gorest.co.in/graphql/schema.graphql

## License

ISC
