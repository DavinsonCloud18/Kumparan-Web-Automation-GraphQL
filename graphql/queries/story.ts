export const FIND_COMPACT_STORY_BY_SLUG = `
  query FindCompactStoryBySlug($slug: String!) {
    FindCompactStoryBySlug: FindStoryBySlug(slug: $slug) {
      __typename
      id
      title
      slug
      leadText
      publishedAt
      createdAt
      isAgeRestrictedContent
      isShowOnWeb
      isShowOnApp
      isDisableComment
      isDisableLike
      isDisableShare
      readTimeInMinutes
      readEligibility

      author {
        id
        name
        username
        isVerified
      }

      publisher {
        id
        name
        slug
        isVerified
      }

      statistic {
        storyID
        storyType
        commentCount
        likeCount
      }

      leadMedia {
        id
        title
        externalURL
        mediaType
      }
    }
  }
`;