/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import './PostItem.css';
import CommentList from './CommentsList';

class PostItem extends React.Component {
  state = {
    activeRename: false,
    title: this.props.post.postItem.title,
  }

  handleStart = () => {
    this.setState({
      activeRename: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { renamePosts, post } = this.props;

    renamePosts(this.state.title, post.postItem.id);
    this.setState({
      activeRename: false,
    });
  }

  handleRename = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { activeRename, title } = this.state;
    const {
      post, addComment, handleSubmit, comment, handleChange, handlePostRemote,
    } = this.props;

    return (
      <div className="post__container">
        {
          activeRename
            ? (
              <form
                onSubmit={this.handleSubmit}
              >
                <input
                  name="title"
                  type="text"
                  onChange={this.handleRename}
                  value={title}
                  className="new-todo"
                />
              </form>
            ) : (
              <>
                <article className="post">
                  <h2
                    onClick={() => {}} handleStart={this.handleStart}
                    className="post__title"
                  >
                    {post.postItem.title ? post.postItem.title : post.postItem}

                  </h2>
                  <p>{post.postItem.body}</p>
                  <Button
                    type="button"
                    onClick={() => handlePostRemote(post.postItem.id, 'remove')}
                    className="basketPage__table-quantity-remove"
                  >
      x
                  </Button>
                </article>
                <CommentList comments={post.postComments} addComment={addComment} handleSubmit={handleSubmit} handleChange={handleChange} comment={comment} />
              </>
            )}
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.shape({
    postItem: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
    }),
    postAuthor: PropTypes.object,
    postComments: PropTypes.object,
  }).isRequired,
  renamePosts: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  comment: PropTypes.shape.isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePostRemote: PropTypes.func.isRequired,
};

export default PostItem;
