import { Categories } from '../Categories/Categories';
import { MainNewModels } from '../MainNewModels/MainNewModels';
import { HotPrices } from '../HotPrices/HotPrices';
import { ProductCard } from '../ProductCard/ProductCard';
import React, { useState } from 'react';
import styles from './Main.module.scss';
// import phones from '../../../public/json/phones.json';
import phones from '../../../public/api/phones.json';

type Props = {
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
  disabledIds: number[];
  width: number;
};
export const Main: React.FC<Props> = ({
  setDisabledIds,
  disabledIds,
  width,
}) => {
  return (
    <>
      <div className={`${styles.main_container}`}>
        <MainNewModels
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          width={width}
        />
        <div
          className={`${styles.scroll_container}`}
          id="scroll_container_new_models"
        >
          {phones.map(
            phone =>
              !phone.priceDiscount && <ProductCard key={phone.id} phone={phone} />,
          )}
        </div>
        <Categories />
        <HotPrices disabledIds={disabledIds} setDisabledIds={setDisabledIds} />
        <div
          className={`${styles.scroll_container}`}
          id="scroll_container_hot_prices"
        >
          {phones.map(
            phone =>
              phone.priceDiscount && <ProductCard key={phone.id} phone={phone} />,
          )}
        </div>
      </div>
    </>
  );
};
