import React from 'react';
import { Button } from '@material-ui/core';
import ListOfPosts from './ListOfPosts';
import './App.css';
import {
  loadComments, loadPosts,
} from './loadData';

class App extends React.Component {
  state = {
    isLoaded: false,
    isLoading: false,
    posts: [],
  };

  handleClick = async() => {
    const comments = await loadComments();
    const posts = await loadPosts();
    const WhitpostAndComments = posts.map(post => ({
      postItem: post,
      postComments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: WhitpostAndComments,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 10);
  };

      renamePosts = (newTitle, id) => {
        this.setState(prevState => ({
          posts: [
            ...prevState.posts.map((post) => {
              if (post.postItem.id === id) {
                return {
                  ...post,
                  postItem: {
                    ...post.postItem,
                    title: newTitle,
                  },
                };
              }

              return post;
            }),
          ],
        }));
      };

  addPost = (postsMap) => {
    this.setState(prevState => ({
      posts: [
        ...prevState.posts,
        {
          postItem: {
            title: postsMap.title,
            body: postsMap.body,
            id: Date.now(),
          },
          postComments: postsMap.comment,
        },
      ],
    }));
  };

  handlePostRemote = (id, operation) => {
    this.setState((prevState) => {
      let currentArray = [...prevState.posts];

      // eslint-disable-next-line default-case
      switch (operation) {
        case 'remove':
          currentArray = currentArray.filter(obj => obj.postItem.id !== id);
          break;
      }

      return {
        posts: currentArray,
      };
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="main">
        {
          !this.state.isLoaded
            ? (
              <Button
                type="button"
                className="load-btn"
                onClick={this.handleClick}
              >
                {this.state.isLoading ? 'Loading...' : 'Load'}
              </Button>
            ) : (
              <>
                <ListOfPosts
                  posts={posts}
                  onSubmit={this.addPost}
                  renamePosts={this.renamePosts}
                  handlePostRemote={this.handlePostRemote}
                />
              </>
            )
        }
      </main>
    );
  }
}

export default App;
