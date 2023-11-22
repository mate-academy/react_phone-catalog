import { useState } from 'react';
import { ArrowButton } from './ArrowButton';
import { ProductCard } from './ProductCard';
import { typographyStyle } from '../CustomStyles/Typography';
import { ProductType } from '../Types/ProductType';

type Props = {
  title?: string;
  products: ProductType[];
};

export const ProductsSlider: React.FC<Props> = ({ title = '', products }) => {
  const [index, setIndex] = useState(0);
  const pages = 3;
  const perPage = 4;
  const allImages = pages * perPage;

  const moveRight = () => {
    setIndex(prev => {
      const newInex = (prev + perPage) % allImages;

      if (newInex < index) {
        return prev;
      }

      return newInex;
    });
  };

  const moveLeft = () => {
    setIndex(prev => {
      const newIndex = (allImages + prev - perPage) % allImages;

      if (newIndex > index) {
        return prev;
      }

      return newIndex;
    });
  };

  return (
    <>
      <div className="col-span-12  flex justify-between">
        <h2 className={typographyStyle.h1}>{title}</h2>

        <div className="flex items-center gap-x-4">
          <ArrowButton
            onClick={moveLeft}
            disabled={index === 0}
            direction="left"
          />
          <ArrowButton
            onClick={moveRight}
            disabled={index === allImages - perPage}
          />
        </div>
      </div>

      <hr className="col-span-full h-[24px] border-0" />

      <div className="col-span-12  overflow-hidden">
        <div
          className="flex gap-x-4 transition-all"
          style={{ transform: `translateX(-${272 * index + 16 * index}px)` }}
        >
          {!!products.length
            && products
              .filter(product => product.year > 2018)
              .slice(0, allImages)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </>
  );
};
