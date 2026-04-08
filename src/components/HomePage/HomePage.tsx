/* eslint-disable max-len */
import { useState } from 'react';
import Product from '../../types/product';
import { PicturesSlider } from '../HomePageBanner';
import './HomePage.scss';
import { BrandNew } from './BrandNew';
import { HotPrices } from './HotPrices';

interface Props {
  products: Product[] | undefined;
}

export const HomePage = ({ products }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const phoneModels = products?.filter(
    product => product.category === 'phones',
  );

  const tabletsModels = products?.filter(
    product => product.category === 'tablets',
  );

  const accessoriesModels = products?.filter(
    product => product.category === 'accessories',
  );

  return (
    <div className="homepage">
      <div className="homepage__slider">
        <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>

        <PicturesSlider />
      </div>

      <div className="homepage__brand-new">
        <BrandNew
          products={products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="homepage__category">
        <h2 className="homepage__category-title">Shop by category</h2>

        <div className="homepage__category-items">
          <div className="homepage__category-item">
            <div className="homepage__category-image homepage__category-image--phones">
              <img
                className="homepage__category-image-phones"
                src="/img/category-phones.webp"
                alt="phones"
              />
            </div>
            <h3 className="homepage__category-text">Mobile phones</h3>
            <p className="homepage__category-models">
              {phoneModels?.length} models
            </p>
          </div>
          <div className="homepage__category-item">
            <div className="homepage__category-image homepage__category-image--tablets">
              <img
                className="homepage__category-image-tablets"
                src="/img/category-tablets.png"
                alt="tablets"
              />
            </div>
            <h3 className="homepage__category-text">Tablets</h3>
            <p className="homepage__category-models">
              {tabletsModels?.length} models
            </p>
          </div>
          <div className="homepage__category-item">
            <div className="homepage__category-image homepage__category-image--accessories">
              <img
                className="homepage__category-image-accessories"
                src="/img/category-accessories.png"
                alt="accesories"
              />
            </div>
            <h3 className="homepage__category-text">Accessories</h3>
            <p className="homepage__category-models">
              {accessoriesModels?.length} models
            </p>
          </div>
        </div>
      </div>

      <div className="homepage__hot-prices">
        <HotPrices
          products={products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
