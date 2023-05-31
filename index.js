import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./conn/db.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
import profileRouter from "./routes/userprofileRoute.js";
import experienceRouter from "./routes/experienceRoute.js";
import educationRouter from "./routes/educationRoute.js";
import friendRouter from "./routes/friendRoute.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
import likeRouter from "./routes/likeRoute.js";
import eventRouter from "./routes/eventRoute.js";
import workspaceRouter from "./routes/workspaceRoute.js";
import chatRouter from "./routes/chatRoute.js";
import messageRouter from "./routes/messageRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use(cors({
  origin: ['https://northtechcommunitycoditech.onrender.com'],

}));



app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/experience", experienceRouter);
app.use("/education", educationRouter);
app.use("/friend", friendRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/event", eventRouter);
app.use("/workspace", workspaceRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Not Found" });
});

const serverBack = app.listen(
  PORT,
  console.log(`server listening on port http://localhost:${PORT}`)
);
const io = new Server(serverBack, {
  pingTimeout: 60000,
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room._id);
  });
  socket.on("new message", (newMessageRecieved, newMessageRecievedUser) => {
    var chat = newMessageRecievedUser;
    if (!chat) return console.log("chat.users not defined");
    chat.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      console.log(newMessageRecieved.sender._id);
      socket.in(user._id).emit("message recieved", newMessageRecieved);
      console.log(newMessageRecievedUser);
    });
  });
});
