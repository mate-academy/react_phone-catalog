import React, { useEffect, useState } from 'react';

import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';

type Props = {
  phoneList: Phone[],
  title: string,
};

export const ProductsSlider: React.FC<Props> = ({
  phoneList,
  title,
}) => {
  const [position, setPosition] = useState<number>(0);
  const itemWidth = 270;
  const gapWidth = 15;
  const width = itemWidth * 4 + gapWidth * 4;

  const [isAuto, setIsAuto] = useState(true);

  const autoSlide = () => {
    if (isAuto) {
      if (position <= -width * (phoneList.length / 4) + width) {
        setPosition(0);

        return;
      }

      setPosition(position - width);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      autoSlide();
    }, 5000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      autoSlide();
    }, 5000);
  }, [position]);

  const showNext = () => {
    setIsAuto(false);

    if (position <= -width * (phoneList.length / 4) + width) {
      setPosition(0);

      return;
    }

    setPosition(position - width);
  };

  const showPrev = () => {
    setIsAuto(false);

    if (position >= 0) {
      setPosition(-width * (phoneList.length / 4) + width);

      return;
    }

    setPosition(position + width);
  };

  return (
    <div className="productSlider">
      <div className="productSlider_top">
        <h1 className="productSlider_top_title">
          {title}
        </h1>

        <div className="productSlider_top_conteiner">
          <button
            className="productSlider_top_conteiner_button"
            type="button"
            onClick={showPrev}
          >
            {'>'}
          </button>

          <button
            className="productSlider_top_conteiner_button"
            type="button"
            onClick={showNext}
          >
            {'<'}
          </button>
        </div>
      </div>
      <div
        className="productSlider_conteiner"
      >
        {phoneList.map(phone => (
          <ProductCard
            phone={phone}
            key={phone.id}
            position={position}
          />
        ))}
      </div>
    </div>
  );
};
