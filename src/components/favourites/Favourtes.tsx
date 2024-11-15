import React, { useContext } from 'react';
import Styles from './Favourites.module.scss';
import { ContextApp } from '../../appContext/AppContext';
import { ProductCard } from '../productCard';

export const Favourites: React.FC = () => {
  const { fav } = useContext(ContextApp);

  return (
    <div className={Styles.fav}>
      <h1 className={Styles.fav__title}>Favourites</h1>

      <p className={Styles.fav__paragraph}>{`${fav.length} items`}</p>

      {/* {!fav.length && <div className={Styles.fav__padding}></div>} */}

      <div className={Styles.fav__container}>
        {fav.map(product => {
          return (
            <ProductCard
              style={{
                transform: `translateX(0px)`,
                transition: 'transform 0s ease-in-out',
              }}
              key={product.id}
              type={product.category}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
};
