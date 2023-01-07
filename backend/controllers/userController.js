import { generateToken } from "../config/token/generateToken.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import ErrorResponse from "../utils/ErrorResponse.js";

//@description     Register new user
//@route           POST /api/users/register
//@access          Public
export const registerUser = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  if (!email || !password || !lastName || !name) {
    return next(
      new ErrorResponse("Please provide all the needed information", 400)
    );
  }

  try {
    const user = await User.create({
      name,
      lastName,
      email,
      password,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//@description     User login
//@route           POST /api/users/login
//@access          Public
export const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    //since we have excluded password in User Model, we are attaching password
    //again, so we can validate the user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const token = user.getSignedJwtToken();

    res.status(200).json({ ...user._doc, token });
    // sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const deleteUserCtrl = async (req, res, next) => {
  const { userID } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userID);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const token = req.user.getSignedJwtToken();
    const user = await User.findByIdAndUpdate(
      _id,
      {
        ...req.body,
        token,
      },
      { new: true }
    );
    console.log(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

//follow a user
export const followUser = async (req, res, next) => {
  try {
    const followingUser = await User.findById(req.params.id);
    const loggedInUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { following: req.params.id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { followers: req.user.id }, isFollowing: true },
      { new: true }
    );

    res.status(200).json("You have successfully followed this user");
  } catch (error) {
    next(error);
  }
};

//unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const followingUser = await User.findById(req.params.id);
    const loggedInUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { following: req.params.id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followers: req.user.id }, isFollowing: false },
      { new: true }
    );

    res.status(200).json("You have successfully unfollowed this user");
  } catch (error) {
    next(error);
  }
};

//bookmark a post
export const bookmarkPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    let post;
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { boomarked: post },
      },
      { new: true }
    )
      .populate("boomarked")
      .then((posts) => {
        res.json(posts);
      });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {};
export const resetPassword = async (req, res, next) => {};

//@description     get all users
//@route           GET /api/user/
//@access          Protected
export const getAllUsers = async (req, res) => {
  // /api/user/?search=john
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

export const getRandomAuthor = async (req, res, next) => {
  // res.send(req.user);

  if (req.user) {
    try {
      // const randomauthor = await User.find({
      //   _id: { $nin: req.user.following },
      //   role: "author",
      // });

      const randomauthor = await User.aggregate([
        { $match: { role: "author", _id: { $nin: req.user.following } } },
        { $sample: { size: 3 } },
      ]);

      res.status(200).json(randomauthor);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const randomAuthors = await User.aggregate([
        { $match: { role: "author" } },
        { $sample: { size: 3 } },
      ]);
      res.status(200).json(randomAuthors);
    } catch (error) {
      next(error);
    }
  }
};

export const getUserProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// const sendToken = (user, statusCode, res) => {
//   const token = user.getSignedJwtToken();
//   res.status(statusCode).json({ sucess: true, token });
// };
