import { memo, useState } from 'react';
import { ButtonSquare } from '../ButtonSquare/ButtonSquare';
import { Icon } from '../../types/Icons';
import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { AMOUNT_OF_PRODUCT_CARDS } from '../../helpers/constants';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = memo(({
  title,
  products,
}) => {
  const [start, setStart] = useState(0);
  const end = start + AMOUNT_OF_PRODUCT_CARDS;

  const handleShowPrevBlock = () => {
    if (start > 0) {
      setStart(prevBlock => prevBlock - 1);
    }
  };

  const handleShowNextBlock = () => {
    if (end < products.length - 1) {
      setStart(prevBlock => prevBlock + 1);
    }
  };

  const visibleCards = products.slice(start, end);

  return (
    <div className="product-slider">
      <div
        className="product-slider__top"
      >
        <h1 className="product-slider__title">{title}</h1>

        <div className="product-slider__buttons">
          <ButtonSquare
            icon={Icon.ArrowLeft}
            onAction={handleShowPrevBlock}
            isDisabled={start <= 0}
          />
          <ButtonSquare
            icon={Icon.ArrowRigt}
            onAction={handleShowNextBlock}
            isDisabled={(end > products.length - 1)}
          />
        </div>
      </div>

      <div
        className="product-slider__container"
      >
        {visibleCards.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
});
