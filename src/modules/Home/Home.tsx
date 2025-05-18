import { ProductList } from '../../shared/ProductList';
import { Slider } from './components/Slider';
import s from './Home.module.scss';

import productsFromServer from '../../../public/api/products.json';
import { Categories } from './components/Categories';

export const Home = () => {
  return (
    <section className={`${s.home} ${s.container}`}>
      <p className={s.home__title}>Welcome to Nice Gadgets store!</p>
      <Slider />
      <ProductList products={productsFromServer} />
      <Categories />
    </section>
  );
};
