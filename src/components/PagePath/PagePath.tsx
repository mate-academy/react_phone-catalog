import { FC } from 'react';
import { Link } from 'react-router-dom';

import './PagePath.scss';

type Props = {
  url: string;
  title: string;
  // eslint-disable-next-line react/require-default-props
  productName?: string | null;
};

export const PagePath: FC<Props> = ({ url, title, productName }) => {
  return (
    <div className="products__page__path path">
      <Link to="/" className="path__home-icon path__icon" />
      <div className="path-block-container">
        <div className="path__arrow-right-icon path__icon" />
        <Link className="path__path-name" to={url}>
          {title}
        </Link>
      </div>

      {productName && (
        <div className="path-block-container">
          <div className="path__arrow-right-icon path__icon" />
          <p className="path__path-name">
            {productName}
          </p>
        </div>
      )}
    </div>
  );
};
