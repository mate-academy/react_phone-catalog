import { useContext } from 'react';
import {
  getItemLocalStorage,
  setLocalStorageItem,
} from '../../../helpers/util';
import {
  GlobalContext,
  reductionValueProduct,
  removeProductInBasket,
  riseValueProduct,
} from '../../../reducer';
import { ShoppingProduct } from '../../../types/shoppingProduct';
import './cardPrice.scss';

type Props = {
  product: ShoppingProduct;
};

export const ShoppingCard: React.FC<Props> = ({ product }) => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContext(GlobalContext);
  const discount
    = product.item.price - (product.item.price / 100) * product.item.discount;

  const remove = () => {
    const list: ShoppingProduct[] = getItemLocalStorage('shoppingList') || [];

    if (list.length) {
      setLocalStorageItem(
        'shoppingList',
        list.filter((el: ShoppingProduct) => el.item.age !== product.item.age),
      );
    }
  };

  const increase = () => {
    const list: ShoppingProduct[] = getItemLocalStorage('shoppingList') || [];

    dispatch({ type: riseValueProduct, id: product.item.age });
    // eslint-disable-next-line
    list.map((el:ShoppingProduct) => {
      if (el.item.age === product.item.age) {
        // eslint-disable-next-line no-param-reassign
        el.value += 1;
      }
    });
    setLocalStorageItem('shoppingList', [...list]);
  };

  const decrease = () => {
    const list: ShoppingProduct[] = getItemLocalStorage('shoppingList') || [];

    dispatch({ type: reductionValueProduct, id: product.item.age });
    // eslint-disable-next-line
    list.map((el:ShoppingProduct) => {
      if (el.item.age === product.item.age) {
        // eslint-disable-next-line no-param-reassign
        el.value -= 1;
      }
    });
    setLocalStorageItem('shoppingList', [...list]);
  };

  const removeProductCard = () => {
    dispatch({ type: removeProductInBasket, age: product.item.age });
    remove();
  };

  return (
    <div className="warpper-card-price" data-cy="cartDeleteButton">
      <button type="button" className="delete" onClick={removeProductCard}>
        <img src="./img/icons/Close.png" alt="close" />
      </button>
      <div className="describe-card">
        <img src={`./${product.item.imageUrl}`} alt="product" />
        <h3>{product.item.name}</h3>
      </div>
      <div className="count-product">
        <button
          type="button"
          className="count-product__button"
          onClick={decrease}
          disabled={product.value === 1}
        >
          -
        </button>
        <div className="count-product__value">{product.value}</div>
        <button
          type="button"
          className="count-product__button"
          onClick={increase}
        >
          +
        </button>
      </div>
      <h2 className="product-price">{`$ ${discount * product.value}`}</h2>
    </div>
  );
};
