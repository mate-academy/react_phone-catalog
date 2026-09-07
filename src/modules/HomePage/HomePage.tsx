/* eslint-disable max-len */
import s from './HomePage.module.scss';
import { BrandNewBlock } from './components/BrandNewBlock/BrandNewBlock';
import { HotPricesBlock } from './components/HotPricesBlock/HotPricesBlock';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ShopByCategoryBlock } from './components/ShopByCategoryBlock/ShopByCategoryBlock';
/* eslint-enable max-len */

export const HomePage = () => {
  return (
    <section className={s.page}>
      <h1>Product Catalog</h1>
      <div className={s.container}>
        <h2 className={s.title}>Welcome to Nice Gadgets store!</h2>
      </div>
      <div className={s.pageContent}>
        <PicturesSlider />
        <BrandNewBlock />
        <ShopByCategoryBlock />
        <HotPricesBlock />
      </div>
    </section>
  );
};
