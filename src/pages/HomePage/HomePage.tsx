import { FC } from 'react';
import { Carousel } from '../../components/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider';
import { sortProducts } from '../../helpers/sortProducts';
import { Product } from '../../types/Product';
import { SortType } from '../../types/SortType';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Pathname } from '../../types/Pathname';
import './home-page.scss';

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
          <ShopByCategory
            to={Pathname.Phones}
            srcImg="img/category-phones+.png"
            title="Mobile phone"
            count={countProducts.phones}
          />
          <ShopByCategory
            to={Pathname.Tablets}
            srcImg="img/category-tablets+.png"
            title="Tablets"
            count={countProducts.tablets}
          />
          <ShopByCategory
            to={Pathname.Accessories}
            srcImg="img/category-accessories+.png"
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
