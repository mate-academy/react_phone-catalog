import { useState } from 'react';
import { Navigation } from '../../types/navigation';
import { Product } from '../../types/product';
import { MyNavButton } from '../UI/MyNavButton';
import { ProductItem } from '../ProductItem';
import './ProductsSlider.scss';

type Props = {
  products: Product[];
};

const CART_WIDTH = 272;
const GAP = 16;
const ITEM_IN_SLIDER = 4;

export const ProductSlider: React.FC<Props> = ({ products }) => {
  const [slider, setSlider] = useState(0);

  function slideTo(direction: Navigation) {
    switch (direction) {
      case Navigation.left:
        setSlider(current => current + 1);
        break;

      case Navigation.right:
        if (slider) {
          setSlider(current => current - 1);
        }

        break;

      default:
        break;
    }
  }

  return (
    <div className="products-slider">
      <div className="products-slider__nav">
        <MyNavButton
          direction={Navigation.left}
          disabled={slider === products.length - ITEM_IN_SLIDER}
          onClick={direction => slideTo(direction)}
        />

        <MyNavButton
          direction={Navigation.right}
          disabled={slider === 0}
          onClick={direction => slideTo(direction)}
        />
      </div>

      <div className="products-slider__wrapper">
        <div
          className="products-slider__carts"
          style={{ transform: `translateX(-${slider * (CART_WIDTH + GAP)}px)` }}
        >
          {products.map(product => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
