const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commnetCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply } = req.body;
      const newComment = new Comments({
        user: req.user._id,
        content,
        tag,
        reply,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();

      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;
      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { content }
      );

      res.json({ msg: "수정되었습니다" });
    } catch (err) {
      return res.json(500).json({ msg: err.message });
    }
  },
};

module.exports = commnetCtrl;