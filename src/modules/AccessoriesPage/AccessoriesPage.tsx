import styles from './AccessoriesPage.module.scss';
import { useContext } from 'react';
// eslint-disable-next-line max-len
import { ProductsBlock } from '../../shared/components/ProductsBlock/ProductsBlock';
import { ProductsCategories } from '../../types/ProductsCategories';
import { AppContext } from '../../utils/AppContext';

export const AccessoriesPage = () => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <main className={isDarkTheme ? styles.mainDark : ''}>
      <ProductsBlock
        title="Accessories"
        categoryName="Accessories"
        productCategory={ProductsCategories.accessories}
      />
    </main>
  );
};
