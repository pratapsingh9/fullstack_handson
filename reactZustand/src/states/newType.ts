import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Comment = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
};

type Post = {
  id: string;
  userId: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};

type UserPostState = {
  posts: Post[];

  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
  updatePost: (postId: string, updatedContent: Partial<Post>) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  clearPosts: () => void;
};

export const userPostStore = create<UserPostState>()(
  persist(
    immer((set) => ({
      posts: [],

      addPost: (post) =>
        set((state) => {
          state.posts.push(post);
        }),

      deletePost: (postId) =>
        set((state) => {
          state.posts = state.posts.filter((post:any) => post.id !== postId);
        }),

      updatePost: (postId, updatedContent) =>
        set((state) => {
          const post = state.posts.find((p:any) => p.id === postId);
          if (post) {
            Object.assign(post, updatedContent);
          }
        }),

      likePost: (postId, userId) =>
        set((state) => {
          const post = state.posts.find((p:any) => p.id === postId);
          if (post && !post.likes.includes(userId)) {
            post.likes.push(userId);
          }
        }),

      unlikePost: (postId, userId) =>
        set((state) => {
          const post = state.posts.find((p:any) => p.id === postId);
          if (post) {
            post.likes = post.likes.filter((id:any) => id !== userId);
          }
        }),

      addComment: (postId, comment) =>
        set((state) => {
          const post = state.posts.find((p:any) => p.id === postId);
          if (post) {
            post.comments.push(comment);
          }
        }),

      clearPosts: () =>
        set((state) => {
          state.posts = [];
        }),
    })),
    {
      name: "user-posts-storage", // localStorage key
    }
  )
);
