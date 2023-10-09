import { FC } from 'react';
import { Product } from '../../types/Product';
import { sortProducts } from '../../helpers/sortProducts';
import { SortType } from '../../types/SortType';
import { Carousel } from '../../components/Carousel';

import './homePage.scss';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Pathname } from '../../types/Pathname';
import { ShopByCategory } from '../../components/ShopByCategory';

const imagesBaners = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

type Props = {
  products: Product[];
  countProducts: { phones: number, tablets: number, accessories: number };
};

export const HomePage: FC<Props> = ({
  products,
  countProducts,
}) => {
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
        <div className="home-page__categories grid">
          <ShopByCategory
            title="Mobile phones"
            to={Pathname.Phones}
            srcImg="img/category-phones.png"
            count={countProducts.phones}
          />
          <ShopByCategory
            title="Tablets"
            to={Pathname.Tablets}
            srcImg="img/category-tablets.png"
            count={countProducts.tablets}
          />
          <ShopByCategory
            title="Accessories"
            to={Pathname.Accessories}
            srcImg="img/category-accessories.png"
            count={countProducts.accessories}
          />
        </div>
        <div className="home-page__new-models">
          <ProductsSlider title="Brand new models" products={sortedByNewest} />
        </div>
      </div>
    </div>
  );
};
