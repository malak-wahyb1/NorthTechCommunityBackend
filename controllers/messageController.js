import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
export function sendMessage(req, res, next) {
  const { content, chatId, sender } = req.body;
  console.log(req.body);
  if (!content || !chatId || !sender) {
    return res.status(400).send({ message: "Invalid request" });
  }

  const message = new Message({
    sender: sender,
    content: content,
    chat: chatId,
  });

  message
    .save()
    .then((response) => {
      Message.find({ _id: response._id }).populate(["chat","sender"])
        .then((mess) => {
          res.status(200).send({ message: mess });
        })
        .catch((error) => {
          res.status(error).send({ message: error });
        });

      Chat.findOneAndUpdate({_id:chatId}, {latestMessage:response._id})
        .then(() => {
        
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

export function allMessages(req, res, next) {
  const { chatId } = req.params;
  Message.find({ chat: chatId }).populate(["chat","sender"])
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "user not found" });
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

