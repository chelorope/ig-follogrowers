import Post from '../models/post';
import sanitizeHtml from 'sanitize-html';
import idGen from 'cuid';
import slug from 'limax';

export default {
  Query: {
    posts: () => {
      Post.find()
        .sort('-dateAdded')
        .exec((err, posts) => {
          return posts;
        });
    },
    post: (_, { cuid }) => {
      Post.findOne({ cuid }).exec((err, post) => {
        return post;
      });
    },
  },
  Mutation: {
    addPost: (_, { name, title, content }) => {
      const newPost = new Post({ name, title, content });

      // Let's sanitize inputs
      newPost.title = sanitizeHtml(newPost.title);
      newPost.name = sanitizeHtml(newPost.name);
      newPost.content = sanitizeHtml(newPost.content);

      newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
      newPost.cuid = idGen();
      newPost.save((err, saved) => {
        if (err) {
          console.log('Error saving post');
        }
        return saved;
      });
    },
  },
  deletePost: (_, { cuid }) => {
    Post.findOne({ cuid }).exec((err, post) => {
      if (err) {
        console.log('Error removing post');
      }

      post.remove();
    });
  },
  Post: cuid =>
    Post.findOne({ cuid }).exec((err, post) => {
      return post;
    }),
};
