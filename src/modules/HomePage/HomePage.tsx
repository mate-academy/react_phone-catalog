import styles from './HomePage.module.scss';

import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HeroSlider } from '../../components/HeroSlider/HeroSlider';
import { NewModels } from '../../components/NewModels/NewModels';
import { Categories } from '../../components/Categories/Categories';
import { HotPrices } from '../../components/HotPrices/HotPrices';

type Props = {
  cart: number[];
  toggleCart: (id: number) => void;
  favorites: number[];
  toggleFavorites: (id: number) => void;
};

export const HomePage: React.FC<Props> = ({
  cart,
  toggleCart,
  favorites,
  toggleFavorites,
}) => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <HeroSlider />
          </section>

          <section className={styles.section}>
            <NewModels
              cart={cart}
              toggleCart={toggleCart}
              favorites={favorites}
              toggleFavorites={toggleFavorites}
            />
          </section>

          <section className={styles.section}>
            <Categories />
          </section>

          <section className={styles.section}>
            <HotPrices
              cart={cart}
              toggleCart={toggleCart}
              favorites={favorites}
              toggleFavorites={toggleFavorites}
            />
          </section>
        </div>
      </main>
    </>
  );
};
