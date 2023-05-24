import {
  addLike,
  deleteLike,
  getLikes,
  getLikePost
} from "../controllers/likeController.js";
import express from "express";
const router = express.Router();

router.post("/", addLike);
router.get("/", getLikes);
router.get("/:id",getLikePost)
router.delete("/:id/:id2", deleteLike);
export default router;
