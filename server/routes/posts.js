const router = require('express').Router();
// const multer = require('multer');
const Post = require('../models/Post');
const User = require('../models/User');

/* const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return cb(new Error('Please upload png, jpg or jpeg images only.'));
    }
    cb(null, true);
  }
}); */

//create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPosts = await newPost.save();
    return res.status(200).json(savedPosts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json('Post has been updated');
    } else {
      return res.status(403).json('You can update only your post');
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json('Post has been deleted');
    } else {
      return res.status(403).json('You can delete only your post');
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//like /dislike a post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get a post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get timeline posts
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId => Post.find({ userId: friendId }))
    );

    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get user's all posts
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
