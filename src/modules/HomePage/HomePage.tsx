/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ShopByCategories } from './components/ShopByCategories';
import s from './HomePage.module.scss';
import { useHomePageProducts } from './hooks/useHomePageProducts';

export const HomePage = () => {
  const { newProducts, hotPrices, loading, errorMessage } =
    useHomePageProducts();

  return (
    <main>
      <h1 className={s.h1Hidden}>Product Catalog</h1>
      <section className={s.container}>
        <div className={s.h1Title}>Welcome to Nice Gadgets store!</div>
      </section>
      <section className={s.sliderWrapper}>
        <PicturesSlider />
      </section>
      {!loading && !errorMessage && (
        <section className={s.container}>
          <ProductsSlider products={newProducts} title="Brand new models" />
        </section>
      )}
      <section className={`${s.container} ${s.paddingBlock}`}>
        <ShopByCategories />
      </section>
      {!loading && !errorMessage && (
        <section className={s.container}>
          <ProductsSlider
            products={hotPrices}
            title="Hot prices"
            priceMode="discount"
          />
        </section>
      )}
    </main>
  );
};
