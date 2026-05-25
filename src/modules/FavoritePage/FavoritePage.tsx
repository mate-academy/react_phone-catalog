import './FavoritePage.scss';
import React from 'react';

type Props = {};

export const FavoritePage: React.FC<Props> = () => {
  return (
    <>
      <div className="favorite">
        <div className="favorite__content">
          <h1 className="favorite__header">Favorites</h1>
        </div>
      </div>
    </>
  );
};
