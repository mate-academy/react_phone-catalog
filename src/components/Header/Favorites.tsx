import React from 'react';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  return (
    <div className="favorites">
      <Link to="/favorites" className="favorites__button" />
    </div>
  );
};
