import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import './styles.css';

const SplittedText = ({ text, additionalClassName }) => {
  const sentence = text.replace(/ /g, '\u00a0').split('');
  const newA = sentence.map((word, idx) => (
    <div
      className="charm"
      style={{ animationDelay: `${idx * 50}ms` }}
      key={shortid.generate()}
    >
      {word}
    </div>
  ));

  return (
    <div className={`charm-wrapper ${additionalClassName}`}>
      {newA}
    </div>
  );
};

SplittedText.defaultProps = {
  additionalClassName: '',
};

SplittedText.propTypes = {
  text: PropTypes.string.isRequired,
  additionalClassName: PropTypes.string,
};

export default React.memo(SplittedText);
