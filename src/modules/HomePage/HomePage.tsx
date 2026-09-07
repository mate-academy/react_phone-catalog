import { FC, useContext, useMemo } from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsSlider } from '../shared/ProductsSlider';
import './HomePage.scss';

const SLICE_LIMIT = 20;
const PHONE_CATEGORY = 'phones';

const calculateDiscount = (fullPrice: number, price: number): number =>
  ((fullPrice - price) / fullPrice) * 100;

const sortByYear = (a: { year: number }, b: { year: number }) =>
  b.year - a.year;

const sortByDiscount = (a: { discount: number }, b: { discount: number }) =>
  b.discount - a.discount;

export const HomePage: FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const newestPhones = useMemo(() => {
    if (!allProducts?.length) {
      return [];
    }

    return allProducts
      .filter(product => product.category === PHONE_CATEGORY)
      .sort(sortByYear)
      .slice(0, SLICE_LIMIT);
  }, [allProducts]);

  const hotPricesProducts = useMemo(() => {
    if (!allProducts?.length) {
      return [];
    }

    return allProducts
      .map(product => ({
        ...product,
        discount: calculateDiscount(product.fullPrice, product.price),
      }))
      .sort(sortByDiscount)
      .slice(0, SLICE_LIMIT);
  }, [allProducts]);

  return (
    <div className="homePage">
      <h1 className="visually-hidden">Product Catalog</h1>
      <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={newestPhones}
        displayType="fullPrice"
      />

      <ShopByCategory />

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        displayType="with-discount"
      />
    </div>
  );
};
