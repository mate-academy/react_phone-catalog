import { FC } from 'react';
import { Link } from 'react-router-dom';
import './PagePath.scss';

type Props = {
  url: string;
  title: string;
  productName?: string | null;
};

export const PagePath: FC<Props> = ({ url, title, productName }) => {
  return (
    <div
      className="products-page__path path"
      data-cy="breadCrumbs"
    >
      <Link
        to="/"
        className="path__home-icon path__icon"
      />

      <div className="path-block-container">
        <div className="path__arrow-right-icon path__icon" />
        <Link to={url} className="path__path-name path__path-name--link">
          {title}
        </Link>
      </div>

      {productName && (
        <div className="path-block-container">
          <div className="path__arrow-right-icon path__icon" />

          <p className="path__path-name">{productName}</p>
        </div>
      )}
    </div>
  );
};

PagePath.defaultProps = {
  productName: null,
};
