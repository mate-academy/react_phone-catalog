import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductSlider } from '../../components/ProductSlider';

import { Product } from '../../types/ProductType';
import { CategoryBox } from '../../components/CategoryBox/CategoryBox';
import { getProductData } from '../../api/fetchClient';
import { getCategorys } from '../shared/constants/Categorys';
import { CategoryBoxType } from '../../types/CategoryBoxType';
import { banners } from '../shared/constants/Baners';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const [categorys, setCategorys] = useState<CategoryBoxType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const [newModels, setNewModels] = useState<Product[] | null>(null);
  const [hotPrices, setHotPrices] = useState<Product[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);

        const data = await getProductData();
        const categotyData = await getCategorys();

        setCategorys(categotyData);

        if (data && data.length > 0) {
          const lastYear = Math.max(...data.map(p => p.year)) - 1;

          setNewModels(
            data
              .filter(product => product.year === lastYear)
              .sort(() => Math.random() - 0.5)
              .slice(0, 12),
          );

          setHotPrices(
            data
              .filter(product => product.year < lastYear - 1)
              .sort(() => Math.random() - 0.314) // :D
              .slice(0, 12),
          );
        }
      } catch {
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={styles.page}>
          <div className={styles.title}>
            <h1>Welcome to Nice Gadgets store!</h1>
          </div>
          <div className={styles.content}>
            <PicturesSlider banners={banners} id={1} />
            {newModels ? (
              <ProductSlider
                products={newModels}
                title={'Brand new models'}
                id={0}
                discount={false}
              />
            ) : (
              <Loader />
            )}
            <CategoryBox categorys={categorys ?? []} />
            {hotPrices ? (
              <ProductSlider
                products={hotPrices ?? []}
                title={'Hot prices'}
                id={2}
                discount={true}
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      )}
    </>
  );
};
