import { Product } from '../type/Product';
import { client } from '../utils/fetchClient';

export function getProducts() {
  return client.get<Product[]>('products.json');
}

/* export function getCreateComment(comment: CommentData) {
  return client.post<Comment>('/comments', comment);
}

export function getUserPosts(userId: number) {
  return client.get<Post[]>('/posts')
    .then(posts => posts.filter(post => post.userId === userId));
}

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function getDeleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
} */
