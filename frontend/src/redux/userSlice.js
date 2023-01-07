import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  feedPosts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.currentUser = action.payload;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.currentUser = null;
      state.token = null;
    },

    updateProfile: (state, action) => {
      state.currentUser = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      const updatePosts = state.posts.map((post) => {
        if (post.id === action.payload.post_id) return action.payload.post;
        return post;
      });

      state.posts = updatePosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  updateProfile,
  setPosts,
  setPost,
} = userSlice.actions;
export default userSlice.reducer;
