import React from 'react';
import { publicPath } from '../../utils/publicPath';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

interface Props {
  image?: string;
  title?: string;
  linkTo?: string;
  linkLabel?: string;
}

export const NotFoundPage: React.FC<Props> = ({
  image = publicPath('/img/page-not-found.png'),
  title = 'Page not found',
  linkTo = '/',
  linkLabel = 'Go to Home page',
}) => {
  useDocumentTitle('Page not found - Nice Gadgets');

  return (
    <div className="not-found-page">
      <img src={image} alt={title} className="not-found-page__image" />
      <h1 className="not-found-page__title">{title}</h1>
      <Link to={linkTo} className="not-found-page__link">
        {linkLabel}
      </Link>
    </div>
  );
};
