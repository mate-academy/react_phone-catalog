import { Categories } from '../Categories/Categories';
import { TitleAndButtonSlider } from '../TitleAndButtonSlider/TitleAndButtonSlider';
import { ProductCard } from '../ProductCard/ProductCard';
import React from 'react';
import styles from './Main.module.scss';
import phones from '../../../public/api/phones.json';

type Props = {
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
  disabledIds: number[];
};
export const Main: React.FC<Props> = ({ setDisabledIds, disabledIds }) => {
  return (
    <>
      <div className={`${styles.main_container}`}>
        <TitleAndButtonSlider
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          title={'Brand new models'}
          startId={0}
          endId={1}
          containerId={'scroll_container_new_models'}
        />
        <div
          className={`${styles.scroll_container}`}
          id="scroll_container_new_models"
        >
          {phones.map(
            phone =>
              phone.priceDiscount && (
                <ProductCard key={phone.id} phone={phone} />
              ),
          )}
        </div>
        <Categories />
        <TitleAndButtonSlider
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          title={'Hot prices'}
          startId={2}
          endId={3}
          containerId={'scroll_container_hot_prices'}
        />
        <div
          className={`${styles.scroll_container}`}
          id="scroll_container_hot_prices"
        >
          {phones.map(
            phone =>
              phone.priceDiscount && (
                <ProductCard key={phone.id} phone={phone} />
              ),
          )}
        </div>
      </div>
    </>
  );
};
