/* eslint-disable */
import { TitleAndButtonSlider } from '../TitleAndButtonSlider/TitleAndButtonSlider';
import React, { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/productsApi';
import { Loader } from '../Loader/Loader';
import { Categories, ProductCard } from '../../utils/lazyComponents';

type Props = {
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
  disabledIds: number[];
  width: number;
};
const Main: React.FC<Props> = ({ setDisabledIds, disabledIds, width }) => {
  const [phones, setPhones] = useState<Product[]>();

  useEffect(() => {
    getProducts('phones')
      .then(setPhones)
      .catch(e => {
        throw new Error(e);
      });
  }, []);

  if (!phones) {
    return (
      <div className={`${styles.loader_container}`}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <main className={`${styles.main_container}`}>
        <TitleAndButtonSlider
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          title={'Brand new models'}
          startId={0}
          endId={1}
          containerId={'scroll_container_new_models'}
          width={width}
        />
        <section
          className={`${styles.scroll_container}`}
          id="scroll_container_new_models"
        >
          {phones.map(
            phone =>
              phone.priceDiscount && (
                <ProductCard key={phone.id} product={phone} />
              ),
          )}
        </section>

        <Categories />

        <TitleAndButtonSlider
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          title={'Hot prices'}
          startId={2}
          endId={3}
          containerId={'scroll_container_hot_prices'}
          width={width}
        />
        <section
          className={`${styles.scroll_container}`}
          id="scroll_container_hot_prices"
        >
          {phones.map(
            phone =>
              phone.priceDiscount && (
                <ProductCard key={phone.id} product={phone} />
              ),
          )}
        </section>
      </main>
    </>
  );
};

export default Main;
