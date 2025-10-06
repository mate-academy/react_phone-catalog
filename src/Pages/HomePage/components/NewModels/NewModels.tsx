import styles from './NewModels.module.scss';

import { useState } from 'react';
import products from '../../../../../public/api/products.json';
import { ProductsSlider } from '../ProductSlider';
import { ProductSliderButtons } from '../ProductSliderButtons';

export const NewModels = () => {
  const [index, setIndex] = useState(0);

  const sortedProducts = [...products].sort((a, b) => b.year - a.year);

  const uniqueProducts = [];

  for (let i = 0; i < sortedProducts.length; i++) {
    const words = sortedProducts[i].name.split(' ');

    if (i > 0 && sortedProducts[i - 1].name.includes(words[words.length - 1])) {
      continue;
    } else {
      uniqueProducts.push(sortedProducts[i]);
    }
  }

  return (
    <section className={styles.newmodels}>
      <div className={styles.newmodels__top}>
        <h2>Brand new models</h2>
        <ProductSliderButtons
          length={uniqueProducts.length}
          index={index}
          setIndex={setIndex}
        />
      </div>
      <ProductsSlider uniqueProducts={uniqueProducts} index={index} />
    </section>
  );
};
