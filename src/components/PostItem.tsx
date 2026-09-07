import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearPost, setSelectedPost } from '../features/selectedPost';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostsItem: React.FC<Props> = ({ post }) => {
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();

  const onSelectedPost = (item: Post) => {
    dispatch(
      selectedPost?.id === item.id ? clearPost() : setSelectedPost(item),
    );
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={() => {
            onSelectedPost(post);
          }}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
