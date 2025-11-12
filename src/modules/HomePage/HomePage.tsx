/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { BrandNewModels } from './components/BrandNewModels/BrandNewModels';
import { PicturesSlider } from './components/PicturesSlider';
import s from './HomePage.module.scss';
import { useHomePageProducts } from './hooks/useHomePageProducts';

export const HomePage = () => {
  const { newProducts, hotPrices, loading, errorMessage } =
    useHomePageProducts();

  console.log(newProducts);
  console.log(hotPrices);
  console.log('loading', loading);
  console.log('errorMessage', errorMessage);

  return (
    <>
      <div className={s.container}>
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <div className={s.sliderWrapper}>
        <PicturesSlider />
      </div>
      {!loading && !errorMessage && <BrandNewModels products={newProducts} />}
    </>
  );
};
