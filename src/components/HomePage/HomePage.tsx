import React from 'react';
import styles from './HomePage.module.scss';
import { Products } from '../../types/Products';
import { useAppContext } from '../../AppContext';
import { GadjetCategory } from '../../types/GadjetCategory';
import PhoneImage from './Category/img/Phones.svg';
import TabletImage from './Category/img/Tablets.svg';
import AccessoriesImage from './Category/img/Accessories.svg';
import { Main } from './Main';
import { Footer } from '../Footer';
import { Models } from './Models';
import { Category } from './Category';

interface Props {
  phones: Products[];
  tablets: Products[];
  accessories: Products[];
}

interface CategoryData {
  name: string;
  image: string;
  count: number;
}

export const HomePage: React.FC<Props> = ({ phones, tablets, accessories }) => {
  const { setCurrentPage } = useAppContext();

  const newModels: Products[] = phones
    .filter(phone => phone.name.includes('Apple iPhone 14'))
    .sort((a, b) => b.fullPrice - a.fullPrice);

  const hotPrices: Products[] = phones
    .filter(phone => phone.fullPrice - phone.price > 80)
    .sort((a, b) => b.price - a.price);

  const categoryData: Record<GadjetCategory, CategoryData> = {
    [GadjetCategory.Phones]: {
      name: 'Mobile phones',
      image: PhoneImage,
      count: phones.length,
    },

    [GadjetCategory.Tablets]: {
      name: 'Tablets',
      image: TabletImage,
      count: tablets.length,
    },

    [GadjetCategory.Accessories]: {
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
        />
        <Category categories={categoryData} setCurrentPage={setCurrentPage} />
        <Models phones={hotPrices} swiperIndex={3} modelsTitle="Hot prices" />
      </div>
      <Footer />
    </main>
  );
};
