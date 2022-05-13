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
};

module.exports = postCtrl;
