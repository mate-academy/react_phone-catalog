import { useContext } from 'react';
import styles from './PhonesPage.module.scss';
// eslint-disable-next-line max-len
import { ProductsBlock } from '../../shared/components/ProductsBlock/ProductsBlock';
import { ProductsCategories } from '../../types/ProductsCategories';
import { AppContext } from '../../utils/AppContext';

export const PhonesPage = () => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <main className={isDarkTheme ? styles.mainDark : ''}>
      <ProductsBlock
        title="Mobile phones"
        categoryName="Phones"
        productCategory={ProductsCategories.phones}
      />
    </main>
  );
};
