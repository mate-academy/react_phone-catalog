import React, { useContext } from 'react';
import './Main.scss';
import { Categories } from '../Categories';
import { ProductSlider } from '../../../../shared/components/ProductSlider';
import { ProductListContext } from '../../../../shared/context/ProductListContext';
import { SliderProvider } from '../../../../shared/context/SliderContext';
import { TranslationContext } from '../../../../../i18next/shared';

type MainProps = {};

export const Main: React.FC<MainProps> = ({}) => {
  const text = useContext(TranslationContext);
  const { productList } = useContext(ProductListContext);

  const productsByDate = [...productList]
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);

  const productsByDiscount = [...productList]
    .sort((a, b) => {
      const aDiscount = a.fullPrice - a.price;
      const bDiscount = b.fullPrice - b.price;

      return bDiscount - aDiscount;
    })
    .slice(0, 5);

  return (
    <main className="main">
      <SliderProvider>
        <ProductSlider
          content={{
            title: text.sliderTitle.productsNew,
            data: productsByDate,
          }}
        />
        <Categories />
      </SliderProvider>

      <SliderProvider>
        <ProductSlider
          content={{
            title: text.sliderTitle.goodPrices,
            data: productsByDiscount,
          }}
          idName={'discounts'}
        />
      </SliderProvider>
    </main>
  );
};
