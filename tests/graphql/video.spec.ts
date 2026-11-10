import { test, expect } from '@playwright/test';
import { FIND_VIDEO_BY_ID } from '../../graphql/queries/video';

const endpoint = 'https://graphql-v4.kumparan.com/query';

test.describe('Kumparan GraphQL - FindVideoByID', () => {

    test('TC02 - Retrieve video by ID', async ({ request }) => {
        const videoId = '1794298254192815927';

        const response = await request.post(endpoint, {
            data: [
                {
                    operationName: 'FindVideoByID',
                    variables: {
                        id: videoId
                    },
                    query: FIND_VIDEO_BY_ID
                }
            ]
        });

        // 1. Validate HTTP response
        expect(response.status()).toBe(200);

        // 2. Read GraphQL response
        const body = await response.json();

        // 3. Validate batch response structure
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(1);

        const result = body[0];

        // 4. Validate GraphQL errors
        expect(result.errors ?? []).toHaveLength(0);

        // 5. Validate returned video
        const video = result.data.FindVideoByID;

        expect(video).toBeDefined();
        expect(video.id).toBe(videoId);
        expect(video.title).toBeTruthy();
        expect(video.status).toBeTruthy();

        // 6. Validate video properties
        expect(video).toHaveProperty('description');
        expect(video).toHaveProperty('enableAds');
        expect(video).toHaveProperty('isPremium');
        expect(video).toHaveProperty('duration');
        expect(video).toHaveProperty('orientation');

        // 7. Validate related media
        if (video.posterMedia) {
            expect(video.posterMedia.id).toBeTruthy();
            expect(video.posterMedia.mediaType).toBeTruthy();
        }

        // 8. Validate stream information
        if (video.stream) {
            expect(video.stream.id).toBeTruthy();
        }

        console.log('Video title:', video.title);
        console.log('Video status:', video.status);
    });

});