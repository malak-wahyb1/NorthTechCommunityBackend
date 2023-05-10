import {
  addLike,
  deleteLike,
  getLikes,
} from "../controllers/likeController.js";
import express from "express";
const router = express.Router();

router.post("/", addLike);
router.get("/", getLikes);

router.delete("/:id", deleteLike);
export default router;
