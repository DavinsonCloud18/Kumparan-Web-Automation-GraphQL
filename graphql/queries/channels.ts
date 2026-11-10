export const FIND_CHANNELS_BY_USER_ALIAS_ID = `
  query FindChannelsOrderByUserAliasID($userAliasID: ID) {
    FindChannelsOrderByUserAliasID(userAliasID: $userAliasID) {
      id
      name
      slug
      metaTitle
      metaDescription
      isVisible
      updatedAt
      __typename
    }
  }
`;