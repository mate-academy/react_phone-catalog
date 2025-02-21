import { Carousel } from '../../components/CaroselHome/CarouselHome';
import styles from './HomePage.module.scss';
import { HomeCategory } from '../../components/HomeCategory/HomeCategory';
import { useAppSelector } from '../../app/hooks';

export const HomePage = () => {
  const { newPhones, hotPrice } = useAppSelector(state => state.product);

  return (
    <div className={styles.container}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <div className={styles.content}>
        <Carousel products={newPhones} name="Brand new models" />
        <HomeCategory />
        <Carousel products={hotPrice} name="Hot prices" />
      </div>
    </div>
  );
};
