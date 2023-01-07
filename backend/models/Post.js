import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    author: {
      type: Object,
    },
    postImg: {
      type: String,
      default: "https://miro.medium.com/max/1200/1*igktvOiB2kVnl7P36-pmPA.png",
    },
    title: { type: String, required: true },
    shortDescription: { type: String },
    body: { type: String, required: true },
    minutesToRead: { type: Number, default: 0 },
    tag: {
      type: String,
      default: "All",
      enum: [
        "Architecture",
        "Sport",
        "Art",
        "Politics",
        "Life&Culture",
        "News",
        "Design",
        "Technology",
        "Blockchain",
        "Crypto",
        "Health&Care",
        "3D",
        "Money",
        "Programming",
        "Productivity",
        "Science",
        "Internet",
        "eSport",
        "History",
      ],
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
