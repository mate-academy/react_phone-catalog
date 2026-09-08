import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsActions from '../features/comments';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const { comments, isLoading, error } = useAppSelector(
    state => state.comments,
  );
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(commentsActions.loadComments(selectedPost.id));
      setVisible(false);
    }
  }, [selectedPost, dispatch]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() =>
                      dispatch(commentsActions.removeComment(comment.id))
                    }
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !error && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
