export const FIND_ALL_ACTIVE_SNAPS = `
  query FindAllActiveSnaps($filter: ActiveSnapFilter) {
    FindAllActiveSnaps(filter: $filter) {
      id
      title
      type

      coverMedia {
        id
        title
        publicID
        externalURL
        mediaType
        width
        height
      }

      edgeItems {
        oldestItem {
          itemID
        }
        newestItem {
          itemID
        }
      }

      attribute {
        ... on ChannelSnapAttribute {
          object {
            id
            slug
          }
        }

        ... on CollectionSnapAttribute {
          object {
            id
            slug
          }
        }

        ... on TopicSnapAttribute {
          object {
            id
            slug
          }
        }
      }
    }
  }
`;