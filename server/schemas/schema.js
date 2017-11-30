export default `
type Post {
  cuid: String!
  name: String!
  title: String!
  content: String!
  slug: String!
  dateAdded: String!
}

# the schema allows the following query:
type Query {
  posts: [Post]
  post(cuid: String!): Post
}

# this schema allows the following mutation:
type Mutation {
  addPost (
    name: String!,
    title: String!,
    content: String!
  ): Post
  deletePost (cuid: String!): Post
}
`;
