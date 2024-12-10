import { Product } from '../types/product';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import * as productActions from '../features/products';
import * as selectedActions from '../features/selectedProduct';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CartCard = () => {
  const dispatch = useAppDispatch();
  const { cartItems, quantity } = useAppSelector(state => state.products);

  const handleSetSelected = (product: Product) => {
    dispatch(
      selectedActions.init({ category: product.category, id: product.itemId }),
    );

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleDeleteProduct = (product: Product) => {
    const updatedCartItems = cartItems.filter(
      item => item.itemId !== product.itemId,
    );

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    dispatch(productActions.deleteCartItem(product.itemId));
  };

  const handleMinusCount = (itemId: string) => {
    dispatch(productActions.setQuantity({ itemId, increment: false }));
  };

  const handlePlusCount = (itemId: string) => {
    dispatch(productActions.setQuantity({ itemId, increment: true }));
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('quantities', JSON.stringify(quantity));
  }, [cartItems, quantity]);

  useEffect(() => {
    let totalPrice = 0;

    cartItems.forEach(item => {
      totalPrice += item.price * quantity[item.itemId];
    });

    dispatch(productActions.setTotalPrice(totalPrice));
  }, [quantity, dispatch, cartItems]);

  return (
    <div className="flex h-full w-full flex-col gap-[16px]">
      {cartItems.map(item => (
        <div
          key={item.itemId}
          className="
            flex
            flex-col
            gap-[16px]
            rounded-[16px]
            border
            border-elements
            sm:flex-row
            sm:justify-between
            p-[16px]
            sm:gap-[24px]
            sm:p-[24px]
          "
        >
          <div
            className="
              flex
              h-full
              w-full
              flex-row
              items-center
              gap-[16px]
              sm:gap-[24px]
            "
          >
            <button
              className="
                h-[16px]
                w-[16px]
                shrink-0
              "
              onClick={() => handleDeleteProduct(item)}
            >
              <img src="./img/icons/Close.svg" alt="Close" className="icons" />
            </button>

            <Link
              className="
                flex 
                cursor-pointer 
                items-center 
                gap-[16px] 
                sm:gap-[24px]
              "
              to={`/${item.category}/${item.itemId}`}
              onClick={() => handleSetSelected(item)}
            >
              <img
                src={item.image}
                alt="ProductImg"
                className="h-[80px] w-[80px]"
              />

              <h3
                className="
                  h-full
                  w-full
                  font-mont-semi
                  text-[14px]
                  leading-[21px]
                text-primary
                "
              >
                {item.name}
              </h3>
            </Link>
          </div>

          <div
            className="
              flex 
              flex-row 
              items-center
              justify-between
              sm:justify-around
              sm:gap-[24px]
              w-full
            "
          >
            <div className="flex flex-row items-center gap-[16px]">
              <button
                className={`
                  section-buttons
                  ${quantity[item.itemId] === 1 ? 'border-elements' : 'border-primary'}
                `}
                onClick={() => handleMinusCount(item.itemId)}
                disabled={quantity[item.itemId] === 1}
              >
                <img
                  src="./img/icons/Minus.svg"
                  alt="Minus"
                  className="icons"
                />
              </button>

              <p
                className="
                  font-mont-semi
                  text-[14px]
                  leading-[21px]
                text-primary
                "
              >
                {quantity[item.itemId] || 1}
              </p>

              <button
                className={`
                  section-buttons
                  border-primary
                `}
                onClick={() => handlePlusCount(item.itemId)}
              >
                <img src="./img/icons/Plus.svg" alt="Plus" className="icons" />
              </button>
            </div>

            <p
              className="
                font-mont-bold 
                text-[22px] 
                leading-[30.8px]
                text-primary
              "
            >{`$${item.price * (quantity[item.itemId] || 1)}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
