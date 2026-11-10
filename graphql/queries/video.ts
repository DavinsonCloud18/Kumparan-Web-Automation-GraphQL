export const FIND_VIDEO_BY_ID = `
  query FindVideoByID($id: ID!) {
    FindVideoByID(id: $id) {
      ...Video
      __typename
    }
  }

  fragment Video on Video {
    id
    title
    description
    posterMedia {
      ...Media
      __typename
    }
    status
    mimeType
    enableAds
    url
    stream {
      id
      __typename
    }
    duration
    isPremium
    videoHeight: height
    videoWidth: width
    orientation
    __typename
  }

  fragment Media on Media {
    id
    title
    description
    publicID
    externalURL
    awsS3Key
    height
    width
    locationName
    locationLat
    locationLon
    mediaType
    mediaSourceID
    photographer
    eventDate
    internalTags
    __typename
  }
`;