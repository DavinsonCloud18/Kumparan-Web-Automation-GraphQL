import { test, expect } from '@playwright/test';
import { FIND_CHANNELS_BY_USER_ALIAS_ID } from '../../graphql/queries/channels';

const endpoint = 'https://graphql-v4.kumparan.com/query';

test('TC03 - Retrieve channels by user alias ID', async ({ request }) => {
    const response = await request.post(endpoint, {
        data: [
            {
                operationName: 'FindChannelsOrderByUserAliasID',
                variables: {
                    userAliasID: ''
                },
                query: FIND_CHANNELS_BY_USER_ALIAS_ID
            }
        ]
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(1);

    const result = body[0];

    expect(result.errors ?? []).toHaveLength(0);

    const channels = result.data.FindChannelsOrderByUserAliasID;

    expect(channels).toBeInstanceOf(Array);
    expect(channels.length).toBeGreaterThan(0);

    for (const channel of channels) {
        expect(channel.id).toBeTruthy();
        expect(channel.name).toBeTruthy();
        expect(channel.slug).toBeTruthy();
        expect(typeof channel.isVisible).toBe('boolean');
    }

    console.log('Total channels:', channels.length);
    console.log('Channel names:', channels.map((channel: { name: string }) => channel.name));
});