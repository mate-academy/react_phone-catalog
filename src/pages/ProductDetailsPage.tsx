import { FC } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import '../styles/styles.scss';

export const ProductDetailsPage: FC = () => {
  const breadcrumbItems = [
    { text: 'Home', link: '/' },
    { text: 'Phones', link: '/phones' },
    {
      text: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
      link: '/phones/product-datails-page',
    },
  ];

  return (
    <div className="product-details-page">
      <Breadcrumbs items={breadcrumbItems} />
      <a className="product-details-page__link-move-back" href="http://">
        <img src="images/icons/ArrowLeft.svg" alt="Back button" />
        Back
      </a>
      <h1 className="product-details-page__title">
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h1>
    </div>
  );
};
