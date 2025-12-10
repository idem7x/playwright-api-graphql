import {test, expect} from '@fixtures/graphqlFixture';
import { Queries } from '@constants/queries';
import { validator } from '@utils/schemaValidator';
import { userSchema, connectionSchema } from '@schemas/schemas';
import { User, Connection } from '@constants/interfaces';

test.describe('User Queries', () => {
  test('should fetch list of users', async ({ createGraphQlClient }) => {

    const response = await createGraphQlClient.query<{ users: Connection<User> }>(
      Queries.GET_USERS,
      { first: 10 }
    );

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data?.users.nodes)).toBe(true);
    expect(response.data?.users.nodes.length).toBeGreaterThan(0);
    expect(response.data?.users.totalCount).toBeGreaterThan(0);

    const validation = validator.validate(
      connectionSchema(userSchema),
      response.data?.users
    );
    expect(validation.valid).toBeTruthy();
  });

  test('should fetch user by ID', async ({ createGraphQlClient }) => {

    const usersResponse = await createGraphQlClient.query<{ users: Connection<User> }>(
      Queries.GET_USERS,
      { first: 1 }
    );
    
    const userId = usersResponse.data?.users.nodes[0].id;
    expect(userId).toBeDefined();

    const response = await createGraphQlClient.query<{ user: User }>(
      Queries.GET_USER_BY_ID,
      { id: userId }
    );

    expect(response.errors).toBeUndefined();
    expect(response.data?.user).toBeDefined();
    expect(response.data?.user.id).toBe(userId);

    const validation = validator.validate(userSchema, response.data?.user);
    expect(validation.valid).toBeTruthy();
  });

  test('should handle pagination correctly', async ({ createGraphQlClient }) => {
    const response = await createGraphQlClient.query<{ users: Connection<User> }>(
      Queries.GET_USERS,
      { first: 5 }
    );

    expect(response.data?.users.pageInfo).toBeDefined();
    expect(response.data?.users.pageInfo.hasNextPage).toBeDefined();
    expect(response.data?.users.nodes.length).toBeLessThanOrEqual(5);
  });

  test('should return error for non-existent user', async ({ createGraphQlClient }) => {
    const response = await createGraphQlClient.queryWithErrors<{ user: User | null }>(
      Queries.GET_USER_BY_ID,
      { id: 999999999 }
    );

    expect(response.data?.user).toBeNull();
  });
});
