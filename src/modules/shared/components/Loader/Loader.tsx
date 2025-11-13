import React from 'react';
import './Loader.scss';

type LoaderProps = {};

export const Loader: React.FC<LoaderProps> = ({}) => {
  const loadingTitle = 'loading...';
  const titleSequence = loadingTitle.toUpperCase().split('');

  return (
    <div className="loader">
      <ul className="loader__content">
        {titleSequence.map((item, i) => (
          <li className="loader__item" key={`${item}-${i}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
