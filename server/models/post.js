import postSchema from '../schemas/post.js';
import mongoose from 'mongoose';

export default mongoose.model('Post', postSchema);
