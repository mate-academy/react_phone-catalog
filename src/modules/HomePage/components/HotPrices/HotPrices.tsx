import React, { useEffect, useState } from 'react';
import styles from './HotPrices.module.scss';
import { Article } from '../../../../shared/types/Article';
import { Carousel } from '../../../../shared/Carousel/Carousel';
import { getDataPublic } from '../../../../shared/functions/functions';

export const HotPrices: React.FC = () => {
  const [elements, setElements] = useState<Article[] | null>(null);

  useEffect(() => {
    getDataPublic('products')
      .then((response: Article[]) => {
        const result = response.filter(
          (el: Article) => el.fullPrice >= el.price + 100,
        );

        setElements(result);
      })
      .catch(() => console.log('error with get data of HotPrices'));
  }, []);

  return (
    <section className={styles.hotPrices}>
      {elements ? (
        <Carousel items={elements} title="Hot Prices" isHot={true} />
      ) : (
        <p>Тут має бути красіва загрузка але я далбайоб</p>
      )}
    </section>
  );
};
