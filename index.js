import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./conn/db.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from './routes/userRoute.js'
import profileRouter from './routes/userprofileRoute.js'
import experienceRouter from './routes/experienceRoute.js'
import educationRouter from './routes/educationRoute.js'
import friendRouter from './routes/friendRoute.js'
import postRouter from './routes/postRoute.js'
import commentRouter from './routes/commentRoute.js'
import likeRouter from './routes/likeRoute.js'
import eventRouter from './routes/eventRoute.js'
import workspaceRouter from './routes/workspaceRoute.js'
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/admin", adminRouter);
app.use("/user",userRouter)
app.use("/profile",profileRouter);
app.use("/experience",experienceRouter);
app.use("/education",educationRouter);
app.use("/friend",friendRouter)
app.use("/post",postRouter)
app.use('/comment',commentRouter)
app.use('/like',likeRouter)
app.use('/event',eventRouter)
app.use('/workspace',workspaceRouter)
app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Not Found" });
});



app.listen(
  PORT,
  console.log(`server listening on port http://localhost:${PORT}`)
);