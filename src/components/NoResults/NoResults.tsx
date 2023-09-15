import React, { FC } from 'react';
import './NoResults.scss';

type Props = {
  title: string;
  imageUrl: string;
};

export const NoResults: FC<Props> = ({ title, imageUrl }) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    <div className="no-results">
      <h2 className="no-results__message">
        {title}
      </h2>

      <div className="no-results__image-container">
        <img
          src={imageUrl}
          alt="No results"
          className="no-results__image"
        />
      </div>
    </div>
  );
};
