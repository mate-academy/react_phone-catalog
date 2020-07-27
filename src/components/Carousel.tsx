import React, { useState } from 'react';
import { Product } from '../interfaces';
import { ProductPreview } from './ProductPreview';
import { handleMove } from '../helpers/handleMove';

interface Props {
  products: Product[];
  width: string;
  title: string;
}

export const Carousel: React.FC<Props> = ({ products, width, title }) => {
  const [margin, setMargin] = useState(0);
  const maxMargin = -(products.length - 4) * 285;
  const handleClick = (option: string) => {
    const marginNew = handleMove(option, margin, 285);

    setMargin(marginNew);
  };

  return (
    <>
      <div className="carousel">
        <div className="carousel__top">
          <h2 className="carousel__title">{title}</h2>
          <div className="carousel__button-wrapper">
            <button
              type="button"
              disabled={margin >= 0}
              className="carousel__button carousel__button--forward"
              onClick={() => handleClick('back')}
            >
              &#60;
            </button>
            <button
              type="button"
              disabled={margin <= maxMargin}
              className="carousel__button carousel__button--back"
              onClick={() => handleClick('forward')}
            >
              &#62;
            </button>
          </div>
        </div>
        <ul style={{ width: `${width}px` }} className="carousel__list">
          {
            products.map((product, index) => (
              <ProductPreview
                key={product.name}
                index={index}
                margin={margin}
                product={product}
                path={`/${product.type}s/`}
              />
            ))
          }
        </ul>
      </div>
    </>
  );
};
