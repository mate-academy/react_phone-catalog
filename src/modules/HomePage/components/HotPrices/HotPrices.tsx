import React, { useContext, useEffect, useState } from 'react';
import styles from '../../HomePage.module.scss';
import { Article } from '../../../../shared/types/Article';
import { Carousel } from '../../../../shared/Carousel/Carousel';
import { Loader } from '../../../../shared/Loader';
import { ProductContext } from '../../../../context/ProductContext';
import { Products } from '../../../../shared/types/Products';
import { useTranslation } from 'react-i18next';

export const HotPrices: React.FC = () => {
  const [elements, setElements] = useState<Article[] | null>(null);
  const checkData = useContext(ProductContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkData(Products.Phones);
      const filtered = data.filter(
        (el: Article) => el.fullPrice >= el.price + 100,
      );

      setElements(filtered);
    };

    fetchData();
  }, [checkData]);

  return (
    <section className={styles.hotPrices}>
      {elements ? (
        <Carousel items={elements} title={t('home_newModels')} isHot={true} />
      ) : (
        <Loader />
      )}
    </section>
  );
};
