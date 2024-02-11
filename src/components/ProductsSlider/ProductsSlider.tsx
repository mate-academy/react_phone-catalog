import { useState } from 'react';
import { Navigation } from '../../types/navigation';
import { Product } from '../../types/product';
import { ProductCart } from '../ProductCart';
import { MyNavButton } from '../UI/MyNavButton';
import './ProductsSlider.scss';

type Props = {
  hotProducts: Product[];
};

const CART_WIDTH = 272;
const GAP = 16;
const ITEM_IN_SLIDER = 4;

export const ProductSlider: React.FC<Props> = ({ hotProducts }) => {
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
    <div className="ProductsSlider">
      <div className="ProductsSlider__nav">
        <MyNavButton
          direction={Navigation.left}
          disabled={slider === hotProducts.length - ITEM_IN_SLIDER}
          onClick={direction => slideTo(direction)}
        />

        <MyNavButton
          direction={Navigation.right}
          disabled={slider === 0}
          onClick={direction => slideTo(direction)}
        />
      </div>

      <div className="ProductsSlider__wrapper">
        <div
          className="ProductsSlider__carts"
          style={{ transform: `translateX(-${slider * (CART_WIDTH + GAP)}px)` }}
        >
          {hotProducts.map(product => (
            <ProductCart product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
