import { FC } from 'react';
import { Product } from '../../../types/Product';
import { sortProducts } from '../../helpers/sortProducts';
import { SortType } from '../../../types/SortType';
import { Carousel } from '../../Parts/Carousel/Carousel';

import './HomePage.scss';
import { ProductsSlider } from '../../Parts/ProductSlider/ProductsSlider';
import { Pathname } from '../../../types/Pathname';
import { ShopByCategory } from '../../Parts/ShopByCategory/ShopByCategory';

const imagesBaners = [
  'img/banners/banner-phones.png',
  'img/banners/banner-tablets.png',
  'img/banners/banner-accessories.png',
];

type Props = {
  products: Product[];
  countProducts: { phones: number; tablets: number; accessories: number };
};

export const HomePage: FC<Props> = ({ products, countProducts }) => {
  const sortedByMaxDiscount = sortProducts(products, SortType.MaxDiscount);
  const sortedByNewest = sortProducts(products, SortType.Newest);

  return (
    <div className="home-page">
      <div className="home-page__container">
        <div className="home-page__carousel">
          <Carousel images={imagesBaners} />
        </div>

        <div className="home-page__hot-price">
          <ProductsSlider title="Hot prices" products={sortedByMaxDiscount} />
        </div>

        <h1 className="home-page__title title">Shop by categoty</h1>
        <div className="home-page__categories grid--categories">
          <div className="home-page__categories--phones">
            <ShopByCategory
              title="Mobile phones"
              to={Pathname.Phones}
              srcImg="img/categories/category-phones.png"
              count={countProducts.phones}
              background="#ffdcc4"
            />
          </div>
          <ShopByCategory
            title="Tablets"
            to={Pathname.Tablets}
            srcImg="img/categories/category-tablets.png"
            count={countProducts.tablets}
            background="#908c94"
          />
          <ShopByCategory
            title="Accessories"
            to={Pathname.Accessories}
            srcImg="img/categories/category-accessories.png"
            count={countProducts.accessories}
            background="#983c5c"
          />
        </div>
        <div className="home-page__new-models">
          <ProductsSlider title="Brand new models" products={sortedByNewest} />
        </div>
      </div>
    </div>
  );
};
