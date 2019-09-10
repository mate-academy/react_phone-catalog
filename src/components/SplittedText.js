import React from 'react';
import shortid from 'shortid';

// eslint-disable-next-line react/prop-types
const SplittedText = ({ text, addClassName }) => {
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
    <div className={`charm-wrapper ${addClassName}`}>
      {newA}
    </div>
  );
};

export default React.memo(SplittedText);
