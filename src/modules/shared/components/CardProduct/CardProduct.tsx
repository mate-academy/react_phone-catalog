import { useState } from 'react';
import { Product } from '../../../../ProductsContext/TabsContext';
import styles from './CardProduct.module.scss';

interface CardProductProps {
  element: Product;
  sale: boolean;
}

export const CardProduct: React.FC<CardProductProps> = ({ element, sale }) => {
  const inform = [
    { name: 'Screen', value: element.screen },
    { name: 'Capacity', value: element.capacity },
    { name: 'RAM', value: element.ram },
  ];

  const [isFavourite, setIsFavourite] = useState(element.favourit);

  const toggleFavourite = () => {
    setIsFavourite(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={element.image} alt={element.name} />
      </div>

      <div className={styles.title}>{element.name}</div>

      <div className={styles.containerPrice}>
        <div className={styles.price}>${element.price}</div>

        {sale && <div className={styles.fullPrice}>${element.fullPrice}</div>}
      </div>

      <div className={styles.blockInform}>
        {inform.map((inf, index) => (
          <div key={index} className={styles.information}>
            <div className={styles.name}>{inf.name}</div>
            <div className={styles.value}>{inf.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.blockButtons}>
        <button className={styles.add}>Add to cart</button>

        <button className={styles.favourites} onClick={toggleFavourite}>
          <img
            src={
              isFavourite ? '/img/favourites-active.svg' : '/img/favourites.svg'
            }
            alt="Favourites"
          />
        </button>
      </div>
    </div>
  );
};
