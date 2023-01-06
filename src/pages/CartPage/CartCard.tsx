import classNames from 'classnames';
import { FC } from 'react';
import { CloseIcon } from 'src/components/Icons/CloseIcon';
import { Product } from 'src/types/Product';

type Props = {
  product: Product,
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const CartCard: FC<Props> = ({
  product,
  setCartProducts,
}) => {
  const renderedPrice = (product.price || product.fullPrice)
  * (product.count || 1);
  const buyingLimit = 10;

  const decrementCount = () => {
    setCartProducts(prev => {
      return prev.map(el => {
        const currentObj = el;

        if (currentObj.id === product.id && currentObj.count > 1) {
          currentObj.count -= 1;
        }

        return currentObj;
      });
    });
  };

  const incrementCount = () => {
    setCartProducts(prev => {
      return prev.map(el => {
        const currentObj = el;

        if (currentObj.id === product.id) {
          if (!currentObj.count) {
            currentObj.count = 2;

            return currentObj;
          }

          if (currentObj.count <= buyingLimit) {
            currentObj.count += 1;
          }
        }

        return currentObj;
      });
    });
  };

  const deleteItemFromCart = (clickedId: string) => {
    setCartProducts(prev => {
      return prev.filter(item => item.id !== clickedId);
    });

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="cart-card">
      <div className="cart-card-left">
        <button
          type="button"
          className="cart-card__close-icon"
          onClick={() => deleteItemFromCart(product.id)}
        >
          <CloseIcon />
        </button>

        <div className="cart-card__wrapper">
          <img
            src={product.image}
            alt="mobile"
            className="cart-card__img"
          />
        </div>

        <div className="cart-card__product-name">
          {product.name}
        </div>
      </div>

      <div className="cart-card-right">
        <div className="cart-card__counter-wrapper">
          <button
            type="button"
            className={classNames(
              'cart-card__counter-left-icon',
              {
                'cart-card__counter-left-icon--disabled':
              product.count === 1 || !product.count,
              },
            )}
            onClick={() => decrementCount()}
          >
            <span />
          </button>

          <span className="cart-card__counter">
            {product.count || '1'}
          </span>

          <button
            type="button"
            className={classNames(
              'cart-card__counter-right-icon',
              {
                'cart-card__counter-right-icon--disabled':
                product.count === buyingLimit,
              },
            )}
            onClick={() => incrementCount()}
          >
            <span className="horizontal" />
            <div className="rotate90">
              <span className="vertical" />
            </div>
          </button>
        </div>

        <div className="cart-card__price">
          {`$${renderedPrice}`}
        </div>
      </div>

    </div>
  );
};
