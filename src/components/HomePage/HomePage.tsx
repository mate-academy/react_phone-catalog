import React from 'react';
import { Main } from './Main';
import styles from './Page.module.scss';
import { Models } from './Models';
import { Category } from './Category';
import { GadgetCategory } from '../../types/GadgetCategory';
import PhoneImage from './Category/img/Phones.svg';
import TabletsImage from './Category/img/Tablets.svg';
import AccessoriesImage from './Category/img/Accessories.svg';
import { Products } from '../../types/Products';
import { Footer } from '../Footer';

interface Props {
  phones: Products[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  favourites: number[];
  cart: number[];
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
}

interface CategoryData {
  name: string;
  image: string;
  count: number;
}

const categoryData: Record<GadgetCategory, CategoryData> = {
  [GadgetCategory.Phones]: {
    name: 'Mobile phones',
    image: PhoneImage,
    count: 123,
  },
  [GadgetCategory.Tablets]: {
    name: 'Tablets',
    image: TabletsImage,
    count: 45,
  },
  [GadgetCategory.Accessories]: {
    name: 'Accessories',
    image: AccessoriesImage,
    count: 67,
  },
};

export const HomePage: React.FC<Props> = ({
  phones,
  setFavourites,
  favourites,
  cart,
  setCart,
}) => {
  const newModels: Products[] = phones
    .filter(phone => phone.name.includes('Apple iPhone 14'))
    .sort((a, b) => b.fullPrice - a.fullPrice);

  const hotPrices: Products[] = phones
    .filter(phone => phone.fullPrice - phone.price > 80)
    .sort((a, b) => b.price - a.price);

  return (
    <main className={styles.page}>
      <div className={styles.page__container}>
        <Main />
        <Models
          phones={newModels}
          swiperIndex={2}
          modelsTitle="Brand new models"
          setFavourites={setFavourites}
          favourites={favourites}
          cart={cart}
          setCart={setCart}
        />
        <Category categories={categoryData} />
        <Models
          phones={hotPrices}
          swiperIndex={3}
          modelsTitle="Hot prices"
          setFavourites={setFavourites}
          favourites={favourites}
          cart={cart}
          setCart={setCart}
        />
      </div>
      <Footer />
    </main>
  );
};
