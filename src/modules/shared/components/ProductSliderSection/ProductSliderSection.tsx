import { ProductCarousel } from './components/ProductCarousel';
import { SliderButtons } from '../../../shared/components/ProductSliderSection/components/SliderButtons';
import { SectionTitle } from '../TextSections/SectionTitle/SectionTitle';
import './ProductSliderSection.scss';
import type { SliderData } from '../../types/SliderData';
import { useRef } from 'react';

type ProductSliderSectionProps = {
  content: SliderData;
  idName?: string;
};

export const ProductSliderSection: React.FC<ProductSliderSectionProps> = ({
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
      <ProductCarousel productList={content.data} />
    </section>
  );
};
