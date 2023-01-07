import Post from "../models/Post.js";
import { User } from "../models/User.js";

//create a new post
export const createPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const isUserAuthor = user.role === "author" ? true : false;

    //  res.json(isUserAuthor);

    if (isUserAuthor) {
      const doc = await Post.create({ ...req.body, author: user });
      const wpm = 225;
      const words = doc.body.trim().split(/\s+/).length;
      doc.minutesToRead = Math.ceil(words / wpm);
      //user.publishedPosts += 1;
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $inc: { publishedPosts: 1 },
        },
        { new: true }
      );
      await doc.save();
      res.status(201).json(doc);
    } else {
      res.json("You are not authorized to post");
    }
  } catch (error) {
    next(error);
  }
};

//get a single post
export const getPost = async (req, res, next) => {
  // console.log(req.params.id);
  // res.send(req.params.id);

  try {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  const user = post.author;

  if (req.user.id === user) {
    try {
      await Post.findByIdAndDelete(req.params.id);
      await User.findByIdAndUpdate(
        req.user.id,
        { $inc: { publishedPosts: -1 } },
        { new: true }
      );

      res.status(200).json({ message: "Post has been deleted" });
    } catch (error) {
      res.status(500).json({ messasge: "Could not delete your post" });
    }
  } else {
    res.status(500).json({ messasge: "You can only delete your posts" });
  }
};

//update a post
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  const user = post.author;
  console.log(user);
  console.log(req.user.id);

  if (req.user.id === user) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ messasge: "Could not update your post" });
    }
  } else {
    res.status(500).json({ messasge: "You can only update your posts" });
  }
};

//get all user's posts
export const getUserPosts = async (req, res) => {
  //id of user
  const { id } = req.params;
  try {
    const userPost = await Post.find({ author: id });
    res.status(200).json(userPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get article of the day
export const getArticleOfTheDay = async (req, res, next) => {
  try {
    // Get the current time
    const currentTime = new Date();
    // Set the time 24 hours ago
    const oneDayAgo = new Date(currentTime - 24 * 60 * 60 * 1000);

    const post = await Post.find({ createdAt: { $gte: oneDayAgo } })
      .sort({ views: -1 })
      .limit(1);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//get user most viewed article
export const getMosViewedUserArticle = async (req, res, next) => {
  try {
    const post = await Post.find({ author: req.params.id })
      .sort({ views: -1 })
      .limit(1);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getLatestArticles = async (req, res, next) => {
  try {
    const post = await Post.find().sort({ createdAt: "desc" }).limit(4);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
