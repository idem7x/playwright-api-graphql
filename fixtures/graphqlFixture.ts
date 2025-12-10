import { test as base } from '@playwright/test';
import { GraphQLClient } from '@utils/graphqlClient';
import { TestDataFactory } from '@utils/testData';
import {CreateUserInput, User} from '@constants/interfaces';
import { Mutations } from '@constants/queries';

type GraphqlFixture = {
    createGraphQlClient: GraphQLClient;
    createGraphQlUser: { userData: CreateUserInput; user: User };
    createAndDeleteGraphQlUser: { userData: CreateUserInput; user: User };
    createUnauthorizedGraphQlClient: GraphQLClient;
};

export const test = base.extend<GraphqlFixture>({
    createGraphQlClient: async ({ request }, use, testInfo) => {
        const baseURL = testInfo.project.use.baseURL || '';
        const graphQlClient = new GraphQLClient(request, baseURL);
        await use(graphQlClient);
    },

    createUnauthorizedGraphQlClient: async ({ playwright }, use, testInfo) => {
        const baseURL = testInfo.project.use.baseURL || '';
        const newContext = await playwright.request.newContext({
            extraHTTPHeaders: {
                'Content-Type': 'application/json'
            }
        });
        const graphQlClient = new GraphQLClient(newContext, baseURL);
        await use(graphQlClient);
        await newContext.dispose();
    },

    createGraphQlUser: async ({ createGraphQlClient }, use) => {
        const userData = TestDataFactory.createUserInput();
        const response = await createGraphQlClient.mutation<{ createUser: { user: User } }>(
            Mutations.CREATE_USER,
            { input: userData }
        );
        const user: User | undefined = response.data?.createUser.user;
        await use({ userData, user });
    },

    createAndDeleteGraphQlUser: async ({ createGraphQlClient }, use) => {
        const userData = TestDataFactory.createUserInput();
        const response = await createGraphQlClient.mutation<{ createUser: { user: User } }>(
            Mutations.CREATE_USER,
            { input: userData }
        );
        const user: User = response.data!.createUser.user;
        await use({ userData, user });

        await createGraphQlClient.mutation(Mutations.DELETE_USER, {
            input: { id: user.id }
        }).catch(() => {});
    }
});

export { expect } from '@playwright/test';