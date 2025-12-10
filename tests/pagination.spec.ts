import {test, expect} from '@fixtures/graphqlFixture';
import {Queries} from '@constants/queries';
import {User, Connection} from '@constants/interfaces';

test.describe('Pagination Tests', () => {
    test('should paginate through users using cursor', async ({createGraphQlClient}) => {
        const firstPage = await createGraphQlClient.query<{ users: Connection<User> }>(
            Queries.GET_USERS,
            {first: 5}
        );

        expect(firstPage.data?.users.nodes.length).toBeLessThanOrEqual(5);
        expect(firstPage.data?.users.pageInfo.hasNextPage).toBeDefined();

        if (firstPage.data?.users.pageInfo.hasNextPage) {
            const cursor = firstPage.data.users.pageInfo.endCursor;

            const secondPage = await createGraphQlClient.query<{ users: Connection<User> }>(
                Queries.GET_USERS,
                {
                    first: 5,
                    after: cursor
                }
            );

            expect(secondPage.data?.users.nodes.length).toBeGreaterThan(0);

            const firstPageIds = firstPage.data.users.nodes.map(u => u.id);
            const secondPageIds = secondPage.data!.users.nodes.map(u => u.id);
            const overlap = firstPageIds.filter(id => secondPageIds.includes(id));
            expect(overlap.length).toBe(0);
        }
    });

    test('should handle different page sizes', async ({createGraphQlClient}) => {

        const pageSizes = [1, 5, 10];

        for (const pageSize of pageSizes) {
            const response = await createGraphQlClient.query<{ users: Connection<User> }>(
                Queries.GET_USERS,
                {first: pageSize}
            );

            expect(response.data?.users.nodes.length).toBeLessThanOrEqual(pageSize);
            expect(response.data?.users.nodes.length).toBeGreaterThan(0);
        }
    });

    test('should return correct totalCount', async ({createGraphQlClient}) => {

        const response = await createGraphQlClient.query<{ users: Connection<User> }>(
            Queries.GET_USERS,
            {first: 10}
        );

        expect(response.data?.users.totalCount).toBeGreaterThan(0);
        expect(typeof response.data?.users.totalCount).toBe('number');
    });
});
