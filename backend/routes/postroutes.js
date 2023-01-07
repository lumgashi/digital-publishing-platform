import express from "express";
import {
  createPost,
  getPost,
  getUserPosts,
  deletePost,
  updatePost,
  getMosViewedUserArticle,
  getArticleOfTheDay,
  getLatestArticles,
} from "../controllers/postController.js";

const postRoutes = express.Router();
import { protect } from "../middleware/authMiddleware.js";

postRoutes.post("/create-post", protect, createPost);
postRoutes.get("/article", getArticleOfTheDay);
postRoutes.get("/latest-article", getLatestArticles);
postRoutes.get("/:id", getPost);
postRoutes.get("/most-viewed-user-article/:id", getMosViewedUserArticle);
postRoutes.get("/user-posts/:id", getUserPosts);
postRoutes.put("/update-post/:id", protect, updatePost);
postRoutes.delete("/delete-post/:id", protect, deletePost);

export default postRoutes;
