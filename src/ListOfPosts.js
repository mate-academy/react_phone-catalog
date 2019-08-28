import React from 'react';
import PropTypes from 'prop-types';
import './ListOfPosts.css';
import PostItem from './PostItem';

class ListOfPosts extends React.Component {
  state = {
    postsMap: {
      title: '',
      comment: '',
      body: '',
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { postsMap } = this.state;

    onSubmit(postsMap);

    this.setState({
      postsMap: {
        comment: '',
        title: '',
      },
    });
  }

    handleChange = (event) => {
      const { name, value } = event.target;

      this.setState(({ postsMap }) => ({
        postsMap: {
          ...postsMap,
          [name]: value,
        },
      }));
    }

    render() {
      const { posts, handlePostRemote, renamePosts } = this.props;
      const { postsMap } = this.state;

      return (
        <div className="posts-list">
          <form onSubmit={this.handleSubmit}>
            <label
              className="new-todo"
              htmlFor="new-todo-title"
            >
              <input
                className="search-post__input"
                placeholder="enter post"
                onChange={this.handleChange}
                value={postsMap.title}
                name="title"
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
          <div className="posts">
            {
              posts.map(post => (
                <PostItem
                  renamePosts={renamePosts}
                  handlePostRemote={handlePostRemote}
                  post={post}
                  key={post.id}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  comment={postsMap.comment}
                />
              ))
            }
          </div>

        </div>
      );
    }
}

ListOfPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  handlePostRemote: PropTypes.func.isRequired,
  renamePosts: PropTypes.func.isRequired,
};

export default ListOfPosts;
