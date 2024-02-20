import { useContext } from 'react';
import { Banner } from '../../components/Banner';
import { BrandNew } from '../../components/BrandNew';
import { HotPrices } from '../../components/HotPrices';
import { Loader } from '../../components/Loader';
import { ShopByCategory } from '../../components/ShopByCategory';
import { ProductsContext } from '../../store/ProductsContext';

import './HomePage.scss';

const bannerPhotos = [
  { id: 1, src: 'img/banner-phones.png', description: 'phones' },
  { id: 2, src: 'img/banner-tablets.png', description: 'tablets' },
  { id: 3, src: 'img/banner-accessories.png', description: 'accessories' },
];

export const HomePage = () => {
  const { loading, errorMessage } = useContext(ProductsContext);

  return (
    <div className="home home__content">
      {loading && <Loader />}

      {errorMessage && (
        <p className="notification-error">{errorMessage}</p>
      )}

      {!loading && !errorMessage && (
        <>
          <Banner photos={bannerPhotos} />

          <HotPrices />

          <ShopByCategory />

          <BrandNew />
        </>
      )}
    </div>
  );
};
