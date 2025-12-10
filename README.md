# Playwright GraphQL API Testing Framework

A comprehensive TypeScript-based GraphQL API testing framework using Playwright for testing the GoREST GraphQL API with schema validation and complete CRUD operations coverage.

## Features

- ✅ **TypeScript** with full type safety
- ✅ **JSON Schema Validation** using AJV
- ✅ **GraphQL Queries & Mutations** testing
- ✅ **Complete CRUD Operations** for Users, Posts, and Todos
- ✅ **Pagination Testing** with cursor-based navigation
- ✅ **Error Handling** and validation tests
- ✅ **Bearer Token Authentication**
- ✅ **Reusable GraphQL Client** and test utilities
- ✅ **ESLint** code quality checks
- ✅ **CI/CD Ready** with GitHub Actions

## Project Structure

```
playwright-graphql-api/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD configuration
├── constants/
│   ├── interfaces.ts                  # GraphQL constants and field definitions
│   └── queries.ts                  # GraphQL query and mutation templates
├── fixtures/
│   └── graphqlFixture.ts                
├── schemas/
│   └── schemas.ts                  # JSON schemas for validation
├── tests/
│   ├── users.query.spec.ts         # User query tests
│   ├── users.mutation.spec.ts      # User mutation tests
│   ├── posts.spec.ts               # Post CRUD tests
│   ├── todos.spec.ts               # Todo CRUD tests
│   ├── pagination.spec.ts          # Pagination tests
│   └── errors.spec.ts              # Error handling tests
├── types/
│   └── global.d.ts                 # TypeScript type definitions
├── utils/
│   ├── graphqlClient.ts            # GraphQL client wrapper
│   └── schemaValidator.ts          # JSON schema validator
├── .env.example                    # Environment variables template
├── .gitignore
├── eslint.config.js
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-graphql-api
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Get your access token from [GoREST](https://gorest.co.in/)

3. Add your token to `.env`:
```env
GOREST_TOKEN=your_token_here
BASE_URL=https://gorest.co.in
GRAPHQL_ENDPOINT=/public/v2/graphql
LOG_LEVEL=info
CI=false
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# View HTML test report
npm run report

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## Test Coverage

### User Operations
- ✅ Query users with pagination
- ✅ Get user by ID
- ✅ Create user with validation
- ✅ Update user details
- ✅ Delete user
- ✅ Email uniqueness validation
- ✅ Email format validation

### Post Operations
- ✅ Query posts with pagination
- ✅ Get post by ID with user details
- ✅ Create post
- ✅ Update post
- ✅ Delete post

### Todo Operations
- ✅ Create todo
- ✅ Get todo by ID
- ✅ Update todo status
- ✅ Delete todo

### Pagination
- ✅ Cursor-based pagination
- ✅ Different page sizes
- ✅ Total count verification

### Error Handling
- ✅ Invalid query syntax
- ✅ Missing required fields
- ✅ Invalid data types
- ✅ Field constraint validation
- ✅ Unauthorized access

## GraphQL Client Usage

```typescript
import { createGraphQLClient } from './utils/graphqlClient';
import { Queries, Mutations } from './constants/queries';

// In your test
const client = createGraphQLClient(request);

// Execute a query
const response = await client.query<{ users: Connection<User> }>(
  Queries.GET_USERS,
  { first: 10 }
);

// Execute a mutation
const createResponse = await client.mutation<{ createUser: { user: User } }>(
  Mutations.CREATE_USER,
  { input: userData }
);

// Handle errors
const errorResponse = await client.queryWithErrors(
  invalidQuery,
  variables
);
```

## Schema Validation

```typescript
import { validator } from './utils/schemaValidator';
import { userSchema } from './schemas/schemas';

// Validate response data
const validation = validator.validate(userSchema, userData);

if (!validation.valid) {
  const errors = validator.getErrorMessages(validation.errors);
  console.log('Validation errors:', errors);
}
```

## Test Data Factory

```typescript
import { TestDataFactory } from './fixtures/testData';

// Generate test user data
const userData = TestDataFactory.createUserInput({
  name: 'Custom Name',
  gender: 'female'
});

// Generate unique email
const email = TestDataFactory.generateUniqueEmail();

// Generate post data
const postData = TestDataFactory.createPostInput(userId, {
  title: 'Custom Title'
});
```

## Key Components

### GraphQL Client (`utils/graphqlClient.ts`)
Provides a fluent interface for executing GraphQL queries and mutations with built-in error handling and status code validation.

### Schema Validator (`utils/schemaValidator.ts`)
Uses AJV for JSON schema validation with caching for improved performance.

### Test Data Factory (`fixtures/testData.ts`)
Generates consistent test data with unique identifiers to avoid conflicts.

### Type Definitions (`types/interfaces.ts`)
Complete TypeScript types for all GraphQL entities and operations.

## CI/CD

The project includes a GitHub Actions workflow that:
- Runs on push and pull requests
- Installs dependencies and Playwright browsers
- Executes all tests
- Uploads test reports and results as artifacts

To use in CI/CD, add your `GOREST_TOKEN` as a GitHub secret.

## Best Practices

1. **Always clean up test data** - Use `afterAll` hooks to delete created resources
2. **Use unique identifiers** - Leverage the TestDataFactory to avoid conflicts
3. **Validate schemas** - Ensure API responses match expected structure
4. **Handle errors gracefully** - Use `queryWithErrors` for error scenarios
5. **Keep tests independent** - Each test should be able to run in isolation

## API Documentation

- **GoREST API**: https://gorest.co.in/
- **GraphQL Endpoint**: https://gorest.co.in/public/v2/graphql
- **GraphQL Schema**: https://gorest.co.in/graphql/schema.graphql

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC

## Author

GraphQL API Testing Framework using Playwright
