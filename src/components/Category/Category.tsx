import React from 'react';
import { Link } from 'react-router-dom';
import './Category.scss';

type Props = {
  image: string,
  backgroundColor: string,
  title: string,
  text: string,
  link: string,
};

export const Category: React.FC<Props> = ({
  image,
  backgroundColor,
  title,
  text,
  link,
}) => {
  return (
    <div className="category">
      <div className="category__content">
        <div
          className="category__image-wrapper"
          style={{
            background: backgroundColor,
          }}
        >
          <img
            src={image}
            alt="phones category"
            className="category__image"
          />
        </div>

        <Link
          to={link}
          className="category__link"
          data-cy="categoryLinksContainer"
        >
          {title}
        </Link>
        <p className="category__text">{text}</p>
      </div>
    </div>
  );
};
