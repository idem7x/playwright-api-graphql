import {test, expect} from '@fixtures/graphqlFixture';
import {Queries, Mutations} from '@constants/queries';
import {TestDataFactory} from '@utils/testData';
import {User} from '@constants/interfaces';

test.describe('Error Handling', () => {
    test('should handle invalid query syntax', async ({createGraphQlClient}) => {
        const invalidQuery = `
      query {
        users {
          invalid_field_name
        }
      }
    `;

        const response = await createGraphQlClient.queryWithErrors(invalidQuery);

        expect(response.errors).toBeDefined();
        expect(response.errors!.length).toBeGreaterThan(0);
        expect(response.errors![0].message).toBeDefined();
    });

    test('should handle missing required fields', async ({createGraphQlClient}) => {

        const response = await createGraphQlClient.queryWithErrors(
            Mutations.CREATE_USER,
            {input: {name: 'Test'}}
        );

        expect(response.errors).toBeDefined();
    });

    test('should handle invalid data types', async ({createGraphQlClient}) => {
        const response = await createGraphQlClient.queryWithErrors<{ user: User }>(
            Queries.GET_USER_BY_ID,
            {id: 'invalid'}
        );

        expect(response.errors).toBeDefined();
    });

    test('should validate field constraints', async ({createGraphQlClient}) => {
        const userData = TestDataFactory.createUserInput({
            email: 'invalid email'
        });

        const response = await createGraphQlClient.queryWithErrors(
            Mutations.CREATE_USER,
            {input: userData}
        );

        expect(response.errors).toBeDefined();
        expect(response.errors![0].message).toMatch(/Validation failed!/i);
    });

    test('should handle unauthorized access without token', async ({createUnauthorizedGraphQlClient}) => {
        const userData = TestDataFactory.createUserInput();

        const response = await createUnauthorizedGraphQlClient.queryWithErrors(
            Mutations.CREATE_USER,
            {input: userData}
        );

        expect(response.errors).toBeDefined();
    });
});
