import { FC } from 'react';
import { Carousel } from '../components/Carousel';
import { ProductsSlider } from '../components/ProductsSlider';
import { sortProducts } from '../helpers/sortProducts';
import { Product } from '../types/Product';
import { SortType } from '../types/SortType';
import { Category } from '../components/Category';

const imagesBaners = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

type Props = {
  products: Product[];
  countProducts: { phones: number; tablets: number; accessories: number };
};

export const HomePage: FC<Props> = ({ products, countProducts }) => {
  const sortedByMaxDiscount = sortProducts(products, SortType.MaxDiscount);
  const sortedByYear = sortProducts(products, SortType.Year).reverse();

  return (
    <div className="home-page">
      <div className="home-page__container">
        <div className="home-page__carousel">
          <Carousel images={imagesBaners} />
        </div>

        <div className="home-page__hot-price">
          <ProductsSlider title="Hot prices" products={sortedByMaxDiscount} />
        </div>

        <h1 className="home-page__title title">Shop by category</h1>
        <div className="home-page__categories grid">
          <Category
            to="/phones"
            srcImg="img/category-phones.png"
            title="Mobile phone"
            count={countProducts.phones}
          />
          <Category
            to="/tablets"
            srcImg="img/category-tablets.png"
            title="Tablets"
            count={countProducts.tablets}
          />
          <Category
            to="/accessories"
            srcImg="img/category-accessories.png"
            title="Accessories"
            count={countProducts.accessories}
          />
        </div>
        <div className="home-page__new-models">
          <ProductsSlider title="Brand new models" products={sortedByYear} />
        </div>
      </div>
    </div>
  );
};
