
import { test, expect } from '@playwright/test';
import { FIND_CURRENT_USER } from '../../graphql/queries/findCurrentUser';

const GRAPHQL_ENDPOINT = 'https://graphql-v4.kumparan.com/query';

test.describe('FindCurrentUser GraphQL API', () => {
    test('should return Unauthenticated when user is not logged in', async ({ request }) => {
        const response = await request.post(GRAPHQL_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                operationName: 'FindCurrentUser',
                variables: {},
                query: FIND_CURRENT_USER,
            },
        });

        // HTTP response validation
        expect(response.status()).toBe(200);

        const result = await response.json();

        // GraphQL error validation
        expect(result.errors).toBeDefined();
        expect(result.errors.length).toBeGreaterThan(0);

        expect(result.errors[0].message).toContain('Unauthenticated');
        expect(result.errors[0].extensions.code).toBe('Unauthenticated');

        // Data validation
        expect(result.data.FindCurrentUser).toBeNull();
    });
});
