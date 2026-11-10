import { test, expect } from '@playwright/test';
import { FIND_COMPACT_STORY_BY_SLUG } from '../../graphql/queries/story';

const endpoint = 'https://graphql-v4.kumparan.com/query';

test('TC04 - Retrieve article by slug', async ({ request }) => {
    const slug =
        'digempur-dari-berbagai-arah-ke-mana-ihsg-akan-melangkah-28XbXbpcMyp';

    const response = await request.post(endpoint, {
        data: [
            {
                operationName: 'FindCompactStoryBySlug',
                variables: { slug },
                query: FIND_COMPACT_STORY_BY_SLUG
            }
        ]
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(1);

    const result = body[0];

    expect(result.errors ?? []).toHaveLength(0);

    const story = result.data.FindCompactStoryBySlug;

    expect(story).toBeDefined();
    expect(story.id).toBeTruthy();
    expect(story.slug).toBe(slug);
    expect(story.title).toBeTruthy();

    expect(story.author).toBeDefined();
    expect(story.author.name).toBeTruthy();

    expect(story.publisher).toBeDefined();
    expect(story.publisher.name).toBeTruthy();

    expect(story.statistic).toBeDefined();
    expect(story.statistic.commentCount).toBeGreaterThanOrEqual(0);
    expect(story.statistic.likeCount).toBeGreaterThanOrEqual(0);

    console.log('Article title:', story.title);
    console.log('Author:', story.author.name);
    console.log('Publisher:', story.publisher.name);
});