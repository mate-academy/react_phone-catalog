import addToCartButtonStyles from './AddToCartButton.module.scss';
import { Product } from '../../shared/types';
import {
  ShoppingCartContextActionType,
  useShoppingCartDispatch,
  useShoppingCartStateValue,
} from '../../context';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
};

export const AddToCartButton = ({ product }: Props) => {
  const { items } = useShoppingCartStateValue();
  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  const isInCart = items.some(item => item.product.id === product.id);

  return (
    <>
      {isInCart && (
        <button
          className={classNames(addToCartButtonStyles.selected, 'font-buttons')}
          onClick={() => {
            navigate('/cart');
          }}
        >
          Selected
        </button>
      )}
      {!isInCart && (
        <button
          className={classNames(
            addToCartButtonStyles.addToCartButton,
            'font-buttons',
          )}
          onClick={() => {
            dispatch({
              type: ShoppingCartContextActionType.ADD_TO_CART,
              payload: product,
            });
          }}
        >
          Add to cart
        </button>
      )}
    </>
  );
};
