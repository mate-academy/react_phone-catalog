import React, { useContext, useEffect, useState } from 'react';
import styles from './HotPrices.module.scss';
import { Article } from '../../../../shared/types/Article';
import { Carousel } from '../../../../shared/Carousel/Carousel';
import { Loader } from '../../../../shared/Loader';
import { ProductContext } from '../../../../context/ProductContext';
import { Products } from '../../../../shared/types/Products';

export const HotPrices: React.FC = () => {
  const [elements, setElements] = useState<Article[] | null>(null);
  const checkData = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkData(Products.Phones);
      const filtered = data.filter(
        (el: Article) =>
          el.fullPrice >= el.price + 100,
      );

      setElements(filtered);
    };

    fetchData();
  }, [checkData]);

  return (
    <section className={styles.hotPrices}>
      {elements ? (
        <Carousel items={elements} title="Hot Prices" isHot={true} />
      ) : (
        <Loader />
      )}
    </section>
  );
};
