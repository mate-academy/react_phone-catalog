import { FC } from 'react';
import './Breadcrumbs.scss';
import { Link } from 'react-router-dom';

type Props = {
  currentPage: string;
  productType: string | null;
};

export const Breadcrumbs: FC<Props> = ({ currentPage, productType = null }) => {
  const links: { [key: string]: string } = {
    phone: 'phones',
    tablet: 'tablets',
    accessory: 'accessories',
  };

  return (
    <div className="breadcrumbs">
      <Link to="/" aria-label="home-link">
        <span className="breadcrumbs__home" />
      </Link>
      {productType && (
        <>
          <span className="breadcrumbs__arrow" />
          <Link
            to={`/${links[productType]}`}
            className="breadcrumbs__link"
          >
            {links[productType]}
          </Link>
        </>
      )}
      <span className="breadcrumbs__arrow" />
      <span className="breadcrumbs__link">{currentPage}</span>
    </div>
  );
};
