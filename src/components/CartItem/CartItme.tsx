/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartItem.scss';
import { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Product } from '../../types/Product';
import { CartContext } from '../CartContext';

type Props = {
  cartProduct: [Product, number];
  productIndex: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CartItem: React.FC<Props> = ({
  cartProduct,
  productIndex,
  setTotalPrice,
  setTotalCount,
}) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [isNotActiveLeftButton, setIsNotActiveLeftButton] = useState(false);
  const [isNotActiveRightButton] = useState(false);

  const deleteProductItem = () => {
    setTotalPrice(
      previewTotalPrice =>
        previewTotalPrice -
        cartProducts[productIndex][0].price * cartProducts[productIndex][1],
    );

    setTotalCount(
      previewTotalCount => previewTotalCount - cartProducts[productIndex][1],
    );

    setCartProducts(prewProducts => {
      const updatedProducts: [Product, number][] = prewProducts.map(
        (pArr, index) => {
          if (index === productIndex) {
            return [pArr[0], 0];
          }

          return pArr;
        },
      );

      return updatedProducts.filter(uP => uP[1] > 0);
    });
  };

  const changeProductQuantity = (action: string) => {
    switch (action) {
      case 'minus': {
        setCartProducts(prewProducts => {
          const updatedProducts: [Product, number][] = prewProducts.map(
            (pArr, index) => {
              if (pArr[1] - 1 === 1) {
                setIsNotActiveLeftButton(true);
              }

              if (index === productIndex) {
                setTotalCount(prewTotalCount => prewTotalCount - 1);
                setTotalPrice(prewTotalPrice => prewTotalPrice - pArr[0].price);

                return [pArr[0], pArr[1] - 1];
              }

              return pArr;
            },
          );

          return updatedProducts.filter(uP => uP[1] > 0);
        });
        break;
      }

      case 'plus': {
        setIsNotActiveLeftButton(false);

        setCartProducts(prewProducts => {
          const updatedProducts: [Product, number][] = prewProducts.map(
            (pArr, index) => {
              if (index === productIndex) {
                setTotalCount(prewTotalCount => prewTotalCount + 1);
                setTotalPrice(prewTotalPrice => prewTotalPrice + pArr[0].price);

                return [pArr[0], pArr[1] + 1];
              }

              return pArr;
            },
          );

          return updatedProducts.filter(uP => uP[1] > 0);
        });
        break;
      }

      default: {
        break;
      }
    }
  };

  useEffect(() => {
    if (cartProduct[1] === 1) {
      setIsNotActiveLeftButton(true);
    }
  }, []);

  useEffect(() => {}, [cartProducts]);

  return (
    <div key={cartProduct[0].id} className="cartItem__item">
      <button
        data-cy="cartDeleteButton"
        className="cartItem__close-button"
        type="submit"
        onClick={deleteProductItem}
      >
        <div className="icon icon--close" />
      </button>

      <div className="cartItem__picture">
        <img
          src={`_new/${cartProduct[0].image}`}
          alt={cartProduct[0].name}
          className="cartItem__image"
        />
      </div>

      <div className="cartItem__product-name">{`${cartProduct[0].name} (iMT9G2FS/A)`}</div>

      <div className="cartItem__counter">
        <button
          disabled={isNotActiveLeftButton}
          className="cartItem__count-button"
          type="submit"
          onClick={() => changeProductQuantity('minus')}
        >
          <div
            className={classnames('icon', 'icon--minus', {
              'icon--minus--disabled': isNotActiveLeftButton,
            })}
          />
        </button>

        <div data-cy="productQauntity" className="cartItem__count-number">
          {cartProduct[1]}
        </div>

        <button
          disabled={isNotActiveRightButton}
          className="cartItem__count-button"
          type="submit"
          onClick={() => changeProductQuantity('plus')}
        >
          <div
            className={classnames('icon', 'icon--plus', {
              'icon--plus--disabled': isNotActiveRightButton,
            })}
          />
        </button>
      </div>

      <div className="cartItem__price">{`$${cartProduct[0].price * cartProduct[1]}`}</div>
    </div>
  );
};
