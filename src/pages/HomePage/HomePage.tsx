import React, { useEffect, useMemo } from 'react';
import { Slider } from '../../components/Slider';
import { ProductSlider } from '../../components/ProductSlider';

import './HomePage.scss';

import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { getProducts } from '../../features/productsSlice';
import { ShopBy } from '../../components/ShopBy';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const isLoaded = useAppSelector(state => state.products.loaded);

  const [phonesCount, tabletsCount, accessoriesCount] = useMemo(() => {
    let phones = 0;
    let tablets = 0;
    let accessories = 0;

    products.forEach((product) => {
      switch (product.category) {
        case 'phones':
          phones += 1;
          break;
        case 'tablets':
          tablets += 1;
          break;
        case 'accessories':
          accessories += 1;
          break;
        default:
          break;
      }
    });

    return [phones, tablets, accessories];
  }, [products]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main className="main">
      <Slider />

      {isLoaded && (
        <section className="hotprices margin-top-70-px">
          <ProductSlider
            title="Hot prices"
            productList={products.slice(0, 12)}
          />
        </section>
      )}

      <section className="shop-by margin-top-70-px">
        <ShopBy
          phonesCount={phonesCount}
          tabletsCount={tabletsCount}
          accessoriesCount={accessoriesCount}
        />
      </section>

      {isLoaded && (
        <section className="brand-new margin-top-70-px">
          <ProductSlider
            title="Brand new model"
            productList={products.slice(12, 24)}
          />
        </section>
      )}
    </main>
  );
};
