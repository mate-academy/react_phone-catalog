import classNames from 'classnames';
import styles from './HomePage.module.scss';
import { Slider } from './components/Slider/Slider';
import { BrandNewBlock } from './components/BrandNewBlock/BrandNewBlock';
import { useContext, useEffect, useState } from 'react';
import { CategoriesBlock } from './components/CategoriesBlock/CategoriesBlock';
import { HotPricesBlock } from './components/HotPricesBlock/HotPricesBlock';
import { Loader } from '../../shared/components/Loader/Loader';
import { Product } from '../../types/Product';
import { DataTypes, getData } from '../../utils/ApiClient';
import { AppContext } from '../../utils/AppContext';

export const HomePage = () => {
  const [isLoading, setIsloading] = useState(true);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const { isDarkTheme } = useContext(AppContext);

  const phonesQuantity = productsList.filter(
    item => item.category === 'phones',
  ).length;

  const tabletsQuantity = productsList.filter(
    item => item.category === 'tablets',
  ).length;

  const accessoriesQuantity = productsList.filter(
    item => item.category === 'accessories',
  ).length;

  useEffect(() => {
    setIsloading(true);

    getData(DataTypes.products)
      .then(items => setProductsList(items))
      .finally(() => setTimeout(() => setIsloading(false), 600));
  }, []);

  return (
    <main className={isDarkTheme ? styles.mainDark : ''}>
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className={styles.container}>
            <h1
              className={classNames(
                styles.h1Title,
                isDarkTheme ? styles.h1TitleDark : '',
              )}
            >
              Welcome to Nice Gadgets store!
            </h1>

            <Slider />
            <div className={styles.homePageContent}>
              <BrandNewBlock productsList={productsList} />
              <CategoriesBlock
                phonesQuantity={phonesQuantity}
                tabletsQuantity={tabletsQuantity}
                accessoriesQuantity={accessoriesQuantity}
              />
              <HotPricesBlock productsList={productsList} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};
