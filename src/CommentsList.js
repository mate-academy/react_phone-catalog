import React from 'react';
import PropTypes from 'prop-types';

import './CommentsList.css';
import CommentItem from './CommentItem';

class CommentsList extends React.Component {
  state = {
    commentsAreVisible: false,
  };

  togleComments() {
    this.setState(prevState => ({
      commentsAreVisible: !prevState.commentsAreVisible,
    }));
  }

  render() {
    const {
      comments, handleSubmit, handleChange, comment,
    } = this.props;
    const { commentsAreVisible } = this.state;

    return (
      <div>
        {
          <button
            className="show-comments-btn"
            type="button"
            onClick={() => {
              this.togleComments(true);
            }}
          >
            {
              commentsAreVisible
                ? 'Скрыть комментарии'
                : 'Показать комментарии'
            }
          </button>
        }
        {
          commentsAreVisible
          && comments && (
            <div className="comments">
              <form onSubmit={handleSubmit}>
                <label
                  className="new-todo"
                  htmlFor="new-todo-title"
                >
                  <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onChange={handleChange}
                    value={comment}
                    name="comment"
                    type="text"
                  />
                </label>
                <button
                  type="submit"
                  className="buttonHide"
                >
          submit
                </button>
              </form>
              {
                comments ? comments.map(commentu => (
                  <CommentItem
                    comment={commentu}
                    key={commentu.id}
                    comments={comments}
                  />
                ))
                  : ''
              }
            </div>
          )
        }
      </div>
    );
  }
}

CommentsList.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  comments: PropTypes.object.isRequired,
};

export default CommentsList;
