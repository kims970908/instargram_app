let users = [];

// connect -> disconnect
const SocketServer = (socket) => {
  socket.on("joinUser", (id) => {
    users.push({ id, socketId: socket.id });
    // console.log("connect", { users });
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    // console.log("disconnect", { users });
  });

  // likesocket
  socket.on("likePost", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likeToClient", newPost);
      });
    }
  });

  // unLikes
  socket.on("unLikePost", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("unLikeToClient", newPost);
      });
    }
  });

  //comment
  socket.on("createComment", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("createCommentToClient", newPost);
      });
    }
  });

  //disComment
  socket.on("deleteComment", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("deleteCommentToClient", newPost);
      });
    }
  });

  // // CommentLike
  // socket.on("commentLike", (newPost) => {
  //   const ids = [...newPost.user.followers, newPost.user._id];
  //   const clients = users.filter((user) => ids.includes(user.id));
  //   if (clients.length > 0) {
  //     clients.forEach((client) => {
  //       socket.to(`${client.socketId}`).emit("commentLikeToClient", newPost);
  //     });
  //   }
  // });

  // // CommentUnLike
  // socket.on("commentUnlike", (newPost) => {
  //   const ids = [...newPost.user.followers, newPost.user._id];
  //   const clients = users.filter((user) => ids.includes(user.id));
  //   if (clients.length > 0) {
  //     clients.forEach((client) => {
  //       socket.to(`${client.socketId}`).emit("commentUnLikeToClient", newPost);
  //     });
  //   }
  // });

  //follow
  socket.on("follow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("followToClient", newUser);
  });

  //Unfollow
  socket.on("unFollow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("unFollowToClient", newUser);
  });

  //createNotify
  socket.on("createNotify", (msg) => {
    const client = users.find((user) => msg.recipients.includes(user.id));
    client && socket.to(`${client.socketId}`).emit("createNotifyToClient", msg);
  });
  //removeNotify
  socket.on("removeNotify", (msg) => {
    const client = users.find((user) => msg.recipients.includes(user.id));
    client && socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg);
  });
};

module.exports = SocketServer;
