import { Product } from '../../../shared/types/types';
import {
  accessoriesPath,
  phonesPath,
  tabletsPath,
} from '../../../shared/consts/paths';
import styles from './Categories.module.scss';
import { CategoryCard } from '../CategoryCard';
import { useMemo } from 'react';
import { Category, LoadingStatus } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Props = {
  products: Product[];
  loadingStatus: LoadingStatus;
};

const getAmountOfModels = (products: Product[], category: Category): number => {
  let amount = 0;

  products.forEach(product => product.category === category && amount++);

  return amount;
};

export const Categories: React.FC<Props> = ({ products, loadingStatus }) => {
  const { categories, phonesCategory, tabletsCategory, accessoriesCategory } =
    useLanguage().localeTexts;

  const amountOfPhones = useMemo(
    () => getAmountOfModels(products, Category.Phones),
    [products],
  );
  const amountOfTablets = useMemo(
    () => getAmountOfModels(products, Category.Tablets),
    [products],
  );
  const amountOfAccessories = useMemo(
    () => getAmountOfModels(products, Category.Accessories),
    [products],
  );

  return (
    <section className={styles.Categories}>
      <h3 className={styles.Title}>{categories}</h3>

      <ul className={styles.List}>
        <li className={styles.Item}>
          <CategoryCard
            title={phonesCategory}
            amountOfModels={amountOfPhones}
            to={phonesPath}
            src="img/categories/category-phones.webp"
            imageScalePercentage={90}
            imageTopPositionPercentage={20}
            imageLeftPositionPercentage={20}
            backgroundColor="#6D6474"
            loadingStatus={loadingStatus}
          />
        </li>

        <li className={styles.Item}>
          <CategoryCard
            title={tabletsCategory}
            amountOfModels={amountOfTablets}
            to={tabletsPath}
            src="img/categories/category-tablets.png"
            imageScalePercentage={150}
            imageTopPositionPercentage={5}
            imageLeftPositionPercentage={5}
            backgroundColor="#8D8D92"
            loadingStatus={loadingStatus}
          />
        </li>

        <li className={styles.Item}>
          <CategoryCard
            title={accessoriesCategory}
            amountOfModels={amountOfAccessories}
            to={accessoriesPath}
            src="img/categories/category-accessories.png"
            imageScalePercentage={190}
            imageTopPositionPercentage={13}
            imageLeftPositionPercentage={5}
            backgroundColor="#973D5F"
            loadingStatus={loadingStatus}
          />
        </li>
      </ul>
    </section>
  );
};
