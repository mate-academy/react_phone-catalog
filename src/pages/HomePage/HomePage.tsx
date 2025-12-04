import s from './HomePage.module.scss';
import { Slider } from '../../components/Slider';
import { NewModels } from '../../components/NewModels';
import { ShopByCategories } from '../../components/ShopByCategories';
import { HotPrices } from '../../components/HotPrices';
import { useProductContext } from '../../context/ShopContext/ProductContext';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';

export const HomePage = () => {
  const { error, isLoading, fetchData } = useProductContext();

  if (error) {
    return <Error errorMEssage="Something went wrong" action={fetchData} />;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <main className={s['home-page']}>
      <h1 className={s['home-page__title']}>Welcome to Nice Gadgets store!</h1>

      <section className={s['home-page__main']}>
        <Slider />
        <NewModels />
        <ShopByCategories />
        <HotPrices />
      </section>
    </main>
  );
};
