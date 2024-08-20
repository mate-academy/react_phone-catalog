import React, { useEffect } from 'react';
import './NotFoundPage.scss';
import { images } from '../../../images';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = `Page Not Found - Nice Gadgets (UA)`;
  }, []);

  return (
    <div className="notFoundPage">
      <div className="container">
        <h1>Page not found</h1>
        <div className="notFoundPage__image-block">
          <img
            src={images.pageNotFound}
            alt="cartEmpty"
            className="notFoundPage__image"
          />
        </div>
      </div>
    </div>
  );
};
