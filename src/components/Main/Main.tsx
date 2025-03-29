import { Categories } from '../Categories/Categories';
import { MainNewModels } from '../MainNewModels/MainNewModels';
import { HotPrices } from '../HotPrices/HotPrices';
import { ProductCard } from '../ProductCard/ProductCard';
import React, { useState } from 'react';
import styles from './Main.module.scss';

export const Main: React.FC = () => {
  const [disabledIds, setDisabledIds] = useState<number[]>([0, 2]);
  return (
    <>
      <MainNewModels disabledIds={disabledIds} setDisabledIds={setDisabledIds}/>
      <div className={`${styles.scroll_container}`} id='scroll_container_new_models'>
        {[1, 2, 3, 4].map(id => {
          return <ProductCard key={id}/>;
        })}
      </div>
      <Categories />
      <HotPrices disabledIds={disabledIds} setDisabledIds={setDisabledIds} />
      <div className={`${styles.scroll_container}`} id='scroll_container_hot_prices'>
        {[1, 2, 3, 4].map(id => {
          return <ProductCard key={id}/>;
        })}
      </div>
    </>
  );
};
