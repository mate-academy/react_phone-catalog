/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', async (userId: number) => {
  const posts = await getUserPosts(userId);

  return posts;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, state => {
      state.error = 'Error';
      state.isLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
