const Posts = require("../models/postModel");

const postCtrl = {
  createPost: async (req, res) => {
    const { content, images } = req.body;

    if (images.length === 0)
      return res.status(400).json({ msg: "사진을 넣어주세요" });

    const newPost = new Posts({
      content,
      images,
      user: req.user._id,
    });

    await newPost.save();

    res.json({
      msg: "Create Post",
      newPost,
    });

    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id],
      })
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        msg: "성공!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      ).populate("user likes", "avatar username fullname");

      res.json({
        msg: "게시물 업데이트",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (post.length > 0)
        return res.status(400).json({ msg: "이미 좋아요 눌렀습니다" });
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "존재하지 않는 게시물 입니다" });
      res.json({ msg: "좋아요" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "존재하지 않는 게시물입니다" });

      res.json({ msg: "좋아요 취소" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ user: req.params.id }).sort(
        "-createdAt"
      );
      res.json({ posts, result: posts.length });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id)
        .populate("user likes", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      if (!post)
        return res.status(400).json({ msg: "게시물이 존재 하지않습니다." });

      res.json({
        post,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;
