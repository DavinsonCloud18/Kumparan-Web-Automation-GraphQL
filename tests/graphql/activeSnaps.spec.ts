import { test, expect } from '@playwright/test';

import {
    FIND_ALL_ACTIVE_SNAPS
} from '../../graphql/queries/activeSnaps';

const endpoint =
    'https://graphql-v4.kumparan.com/query?deduplicate=1';

test.describe('Kumparan GraphQL - Active Snaps', () => {

    test('TC01 - Get all active snaps', async ({ request }) => {

        // 1. Define GraphQL variables
        const variables = {
            filter: {
                types: [
                    'TOPIC',
                    'CHANNEL',
                    'COLLECTION',
                    'CUSTOM',
                    'RECAP'
                ]
            }
        };

        // 2. Send GraphQL request
        const response = await request.post(endpoint, {
            data: [
                {
                    operationName: 'FindAllActiveSnaps',
                    variables,
                    query: FIND_ALL_ACTIVE_SNAPS
                }
            ]
        });

        // 3. Validate HTTP status
        expect(response.status()).toBe(200);

        // 4. Read response
        const body = await response.json();

        // 5. Validate batch response
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(1);

        const result = body[0];

        // 6. Validate GraphQL errors
        expect(result.errors ?? []).toHaveLength(0);

        // 7. Validate GraphQL data
        expect(result.data).toBeDefined();

        const snaps = result.data.FindAllActiveSnaps;

        expect(snaps).toBeInstanceOf(Array);
        expect(snaps.length).toBeGreaterThan(0);

        // 8. Validate individual Snap objects
        for (const snap of snaps) {

            expect(snap.id).toBeTruthy();
            expect(snap.title).toBeTruthy();

            expect([
                'TOPIC',
                'CHANNEL',
                'COLLECTION',
                'CUSTOM',
                'RECAP'
            ]).toContain(snap.type);

            expect(snap.edgeItems).toBeDefined();

            expect(snap.coverMedia).toBeDefined();
            expect(snap.coverMedia.id).toBeTruthy();

        }

    });

});