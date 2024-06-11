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
import { PageSection } from '../../types/PageSection';

interface Props {
  phones: Products[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  favourites: number[];
  cart: number[];
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageSection>>;
  tablets: Products[];
  accessories: Products[];
}

interface CategoryData {
  name: string;
  image: string;
  count: number;
}

export const HomePage: React.FC<Props> = ({
  phones,
  tablets,
  accessories,
  setFavourites,
  favourites,
  cart,
  setCart,
  setCurrentPage,
}) => {
  const newModels: Products[] = phones
    .filter(phone => phone.name.includes('Apple iPhone 14'))
    .sort((a, b) => b.fullPrice - a.fullPrice);

  const hotPrices: Products[] = phones
    .filter(phone => phone.fullPrice - phone.price > 80)
    .sort((a, b) => b.price - a.price);

  const categoryData: Record<GadgetCategory, CategoryData> = {
    [GadgetCategory.Phones]: {
      name: 'Mobile phones',
      image: PhoneImage,
      count: phones.length,
    },
    [GadgetCategory.Tablets]: {
      name: 'Tablets',
      image: TabletsImage,
      count: tablets.length,
    },
    [GadgetCategory.Accessories]: {
      name: 'Accessories',
      image: AccessoriesImage,
      count: accessories.length,
    },
  };

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
        <Category categories={categoryData} setCurrentPage={setCurrentPage} />
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
