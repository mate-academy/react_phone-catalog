import React from 'react';
import PropTypes from 'prop-types';
import './CommentItem.css';

const CommentItem = ({ comment, comments }) => (
  <div className="comments__item">
    <p className="comments__item__body">
      {comment.body ? comment.body : comments}
    </p>
  </div>
);

CommentItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comments: PropTypes.object.isRequired,
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default CommentItem;
