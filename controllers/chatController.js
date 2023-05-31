import Chat from "../models/chatModel.js";

export function accessChat(req, res, next) {
  const { user1 } = req.body;
  const { user2 } = req.body;
  if (!user1 && !user2) {
    return res.send("enter credentials");
  }
  Chat.findOne({ user: user1, user: user2 })
    .then((chat) => {
      if (chat) {
        res.send(chat);
      } else {
        const newChat = new Chat({
          user: [user1, user2],
          chatName: req.body.chatName,
          isGroupChat: req.body.isGroupChat,
          latestMessage: req.body.latestMessage,
          qroupAdmin: req.body.qroupAdmin,
        });
        newChat
          .save()
          .then((newChat) => {
            Chat.findOne({ _id: newChat._id })
              .then((chat) => {
                res.send(chat);
              })
              .catch((error) => {
                console.log(error);
                next(error);
              });
          })
          .catch((error) => {
            console.error(error);
            next(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
}

export function fetchChats(req, res, next) {
  Chat.find({ user: { $all: req.query.user1 } })
    .then((chats) => {
      res.status(200).send(chats);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
}

export function createGroupChat(req, res, next) {
  if (!req.body.user || !req.body.chatName) {
    res.status(400).send({ message: "please enter chat name" });
  }
  var user = req.body.user;
  if (user.length < 2) {
    return res
      .status(400)
      .send({ message: "More than 2 users are required to form a group chat" });
  }
  console.log(req.body);
  const groupChat = new Chat({
    chatName: req.body.chatName,
    user: user,
    isGroupChat: true,
    groupAdmin: req.body.groupAdmin,
  });
  groupChat.save().then((group) => {
    Chat.findOne({ _id: group._id })
      .then((group) => {
        res.status(200).send(group);
      })
      .catch((error) => {
        next(error);
      });
  });
}
export function renameGroup(req, res, next) {
  const { chatId, chatName } = req.body;
  Chat.findOneAndUpdate({ _id: chatId }, { chatName }, { new: true })
    .then((chat) => {
      res.status(200).send(chat);
    })
    .catch((error) => {
      next(error);
    });
}
export function addToGroup(req, res, next) {
  const { chatId, userId } = req.body;
  Chat.findOneAndUpdate(
    { _id: chatId },
    { $push: { user: userId } },
    { new: true }
  )
    .then((response) => {
      res.status(200).send({ message: response });
    })
    .catch((error) => {
      next(error);
    });
}
export function removeFromGroup(req, res, next) {
  const { chatId, userId } = req.body;
  Chat.findOneAndUpdate(
    { _id: chatId },
    { $pull: { user: userId } },
    { new: true }
  )
    .then((response) => {
      res.status(200).send({ message: response });
    })
    .catch((error) => {
      next(error);
    });
}
