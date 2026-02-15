import { FC, useContext, useMemo } from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsSlider } from '../shared/ProductsSlider';
import './HomePage.scss';

const SLICE_LIMIT = 20;
const PHONE_CATEGORY = 'phones';
const TABLET_CATEGORY = 'tablets';

const calculateDiscount = (fullPrice: number, price: number): number =>
  ((fullPrice - price) / fullPrice) * 100;

const sortByYear = (a: { year: number }, b: { year: number }) =>
  b.year - a.year;

const sortByDiscount = (a: { discount: number }, b: { discount: number }) =>
  b.discount - a.discount;

const normalizeModelName = (name: string) =>
  name.replace(/\b(32GB|64GB|128GB|256GB|512GB|1TB)\b/gi, '').trim();

export const HomePage: FC = () => {
  const { allProducts } = useContext(GlobalContext);

  // --- Brand new models ---
  const newestPhones = useMemo(() => {
    if (!allProducts?.length) return [];

    return allProducts
      .filter(product => product.category === PHONE_CATEGORY)
      .map(product => ({
        ...product,
        modelName: normalizeModelName(product.name),
      }))
      .sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const aIsIphone14 = aName.includes('iphone 14');
        const bIsIphone14 = bName.includes('iphone 14');

        const aIsPurple = aName.includes('purple');
        const bIsPurple = bName.includes('purple');

        // 1️ усі iPhone 14 перед іншими
        if (aIsIphone14 && !bIsIphone14) return -1;
        if (!aIsIphone14 && bIsIphone14) return 1;

        // 2️ усередині iPhone 14 — Purple перший
        if (aIsIphone14 && bIsIphone14) {
          if (aIsPurple && !bIsPurple) return -1;
          if (!aIsPurple && bIsPurple) return 1;
        }

        // 3️ решта — за роком (новіші раніше)
        if (a.year !== b.year) return sortByYear(a, b);

        // 4️ у межах року — групуємо за моделлю
        if (a.modelName < b.modelName) return -1;
        if (a.modelName > b.modelName) return 1;

        return 0;
      })
      .slice(0, SLICE_LIMIT);
  }, [allProducts]);

  // --- Hot prices ---
  const hotPricesProducts = useMemo(() => {
    if (!allProducts?.length) return [];

    const withDiscount = allProducts.map(product => ({
      ...product,
      discount: calculateDiscount(product.fullPrice, product.price),
      modelName: normalizeModelName(product.name),
    }));

    return withDiscount
      .sort((a, b) => {
        if (a.category === TABLET_CATEGORY && b.category !== TABLET_CATEGORY)
          return -1;
        if (a.category !== TABLET_CATEGORY && b.category === TABLET_CATEGORY)
          return 1;

        if (a.category === TABLET_CATEGORY && b.category === TABLET_CATEGORY) {
          if (a.modelName < b.modelName) return -1;
          if (a.modelName > b.modelName) return 1;
        }

        return sortByDiscount(a, b);
      })
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
