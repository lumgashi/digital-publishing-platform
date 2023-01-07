import express from "express";
import {
  registerUser,
  authUser,
  forgotPassword,
  resetPassword,
  getRandomAuthor,
  getUserProfile,
  deleteUserCtrl,
  updateUser,
  followUser,
  unfollowUser,
  bookmarkPost,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", authUser);
userRoutes.post("/forgot-pasword", forgotPassword);
userRoutes.post("/reset-pasword/:resetToken", resetPassword);
userRoutes.get("/random-author", protect, getRandomAuthor);
userRoutes.get("/user-profile/:id", getUserProfile);
userRoutes.put("/update-user", protect, updateUser);
userRoutes.put("/follow/:id", protect, followUser);
userRoutes.put("/unfollow/:id", protect, unfollowUser);
userRoutes.put("/bookmark/:postId", protect, bookmarkPost);
userRoutes.delete("/delete-user/:userID", deleteUserCtrl);

export default userRoutes;
