import { useMemo } from 'react';
import { addCount, decCount, deleteCart } from '../../redux/cartSlice';
import { AllProduct } from '../../types/UnionType';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import './CartPage.scss';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector(state => state.cart.data) as {
    item: AllProduct;
    count: number;
  }[];

  const handleMinus = (id: string) => {
    dispatch(decCount(id));
  };

  const handlePlus = (id: string) => {
    dispatch(addCount(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCart(id));
  };

  const info = useMemo(() => {
    const result = {
      price: 0,
      count: 0,
    };

    result.price = cartList.reduce((sum, item) => {
      result.count += item.count;

      return (
        sum +
        ('price' in item.item ? item.item.price : item.item.priceDiscount) *
          item.count
      );
    }, 0);

    return result;
  }, [cartList]);

  return (
    <div className="cartPage">
      <h1 className="cartPage__title">Cart</h1>
      <div className="cartPage__content">
        <div className="cartPage__list">
          {cartList.map(({ item, count }) => (
            <div className="cardList" key={item.id}>
              <span
                className="cardList__cross"
                onClick={() =>
                  handleDelete('itemId' in item ? item.itemId : item.id)
                }
              />
              <img
                src={'image' in item ? item.image : item.images[0]}
                alt={item.name}
                className="cardList__img"
              />
              <span className="cardList__name">{item.name}</span>
              <div className="cardList__controller">
                <div
                  className="cardList__button cardList__button--minus"
                  onClick={() =>
                    handleMinus('itemId' in item ? item.itemId : item.id)
                  }
                >
                  -
                </div>
                <span className="cardList__count">{count}</span>
                <div
                  className="cardList__button cardList__button--plus"
                  onClick={() =>
                    handlePlus('itemId' in item ? item.itemId : item.id)
                  }
                >
                  +
                </div>
              </div>
              <h3>{`$${'price' in item ? item.price : item.priceDiscount}`}</h3>
            </div>
          ))}
        </div>
        <div className="cartPage__totalBox">
          <div className="cartPage__totalText">
            <h2>${info.price}</h2>
            <span className="cartPage__totalItems">{`Total for ${info.count} items`}</span>
          </div>
          <hr className="cartPage__line" />
          <button className="cartPage__button" onClick={() => null}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
