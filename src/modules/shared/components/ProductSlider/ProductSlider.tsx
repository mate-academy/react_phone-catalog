import { SliderProductList } from '../../../components/HomePage/components/SliderProductList';
import { SliderButtons } from '../SliderButtons';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import './ProductSlider.scss';
import type { SliderData } from '../../types/SliderData';
import { useRef } from 'react';

type ProductSliderProps = {
  content: SliderData;
  idName?: string;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  content,
  idName,
}) => {
  const sliderRef = useRef<HTMLElement>(null);

  return (
    <section
      id={idName ? idName : ''}
      className="product-slider"
      ref={sliderRef}
    >
      <div className="product-slider__top">
        <div className="product-slider__top__wrapper">
          <SectionTitle text={content.title} />
          <SliderButtons itemAmount={content.data.length} />
        </div>
      </div>
      <SliderProductList productList={content.data} />
    </section>
  );
};
