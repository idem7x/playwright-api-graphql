import {test, expect} from '@fixtures/graphqlFixture';
import {Mutations} from '@constants/queries';
import {TestDataFactory} from '@utils/testData';
import {validator} from '@utils/schemaValidator';
import {userSchema} from '@schemas/schemas';
import {User} from '@constants/interfaces';

test.describe('User Mutations', () => {
    let createdUserId: number;

    test('should create a new user', async ( { createGraphQlUser }) => {

        const {userData, user} = createGraphQlUser;
        createdUserId = user.id;

        expect(user).toBeDefined();
        expect(user.name).toBe(userData.name);
        expect(user.email).toBe(userData.email);
        expect(user.gender).toBe(userData.gender);
        expect(user.status).toBe(userData.status);

        const validation = validator.validate(userSchema, user);
        expect(validation.valid).toBeTruthy();
    });

    test('should update an existing user', async ({createGraphQlClient, createGraphQlUser}) => {

        const { user} = createGraphQlUser;
        createdUserId = user.id;

        const updatedName = 'Updated Name ' + Date.now();
        const updateResponse = await createGraphQlClient.mutation<{ updateUser: { user: User } }>(
            Mutations.UPDATE_USER,
            {
                input: {
                    id: createdUserId,
                    name: updatedName
                }
            }
        );

        expect(updateResponse.errors).toBeUndefined();
        expect(updateResponse.data?.updateUser.user.id).toBe(createdUserId);
        expect(updateResponse.data?.updateUser.user.name).toBe(updatedName);
    });

    test('should delete a user', async ({createGraphQlClient, createGraphQlUser}) => {

        const { user} = createGraphQlUser;
        createdUserId = user.id;

        const deleteResponse = await createGraphQlClient.mutation<{ deleteUser: { user: User | null } }>(
            Mutations.DELETE_USER,
            {input: {id: createdUserId}}
        );

        expect(deleteResponse.errors).toBeUndefined();
        expect(deleteResponse.data?.deleteUser).toBeDefined();
    });

    test('should validate email format on creation', async ({createGraphQlClient}) => {

        const userData = TestDataFactory.createUserInput({email: 'invalid-email'});

        const response = await createGraphQlClient.queryWithErrors<{ createUser: { user: User } }>(
            Mutations.CREATE_USER,
            {input: userData}
        );

        expect(response.errors).toBeDefined();
        expect(response.errors![0].message).toContain('Validation failed!');
    });

    test('should not create user with duplicate email', async ({createGraphQlClient, createGraphQlUser}) => {
        const { user } = createGraphQlUser;
        createdUserId = user.id;
        const email = user.email;

        const userData2 = TestDataFactory.createUserInput({email});
        const response2 = await createGraphQlClient.queryWithErrors<{ createUser: { user: User } }>(
            Mutations.CREATE_USER,
            {input: userData2}
        );

        expect(response2.errors).toBeDefined();
    });
});
