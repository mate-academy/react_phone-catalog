import React, { useEffect, useState } from 'react';
import { Price } from '@modules/shared/components/Price/';
import { CartItem, useCart } from '@modules/shared/components/Context/';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@modules/shared/components/Icon';

interface Props {
  data: CartItem;
}

const deleteItem = (
  array: CartItem[] | null,
  itemToDelete: CartItem | null,
) => {
  if (!array || !itemToDelete) {
    return [];
  }

  return array.filter(item => {
    if (item.product.itemId !== itemToDelete.product.itemId) {
      return true;
    }

    return false;
  });
};

export const CartElement: React.FC<Props> = ({ data }) => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(
    data.amount * data.product.price,
  );

  const changingAmount = (elem: CartItem, operation: Operations) => {
    const item = cart?.find(e => e.product.itemId === elem.product.itemId);

    if (typeof item === 'undefined') {
      throw Error('failed to find element in cart');
    }

    switch (operation) {
      case 'increase':
        item.amount = item.amount + 1;

        break;
      case 'decrease':
        item.amount = item.amount - 1;

        break;
      case 'delete':
        return setCart?.(deleteItem(cart || null, item));
    }

    if (cart) {
      setCart?.([...cart]);
    }
  };

  useEffect(() => {
    setTotalPrice(data.amount * data.product.price);
  }, [data.amount, setTotalPrice, data.product.price]);

  return (
    <div className="cartElement">
      <button
        className="button cartElement__deleteButton"
        onClick={() => changingAmount(data, 'delete')}
        style={{ gridArea: 'box-1' }}
      >
        <Icon iconSlug="X" />
      </button>
      <img
        src={`${import.meta.env.BASE_URL}/${data.product.image}`}
        alt={data.product.name}
        className="cartElement__photo"
        style={{ gridArea: 'box-2' }}
        onClick={() =>
          navigate(`/${data.product.category}/${data.product.itemId}`)
        }
      />
      <h4
        className="cartElement__text cartElement__name"
        style={{ gridArea: 'box-3' }}
      >
        {data.product.name}
      </h4>

      <div className="cartElement__amount" style={{ gridArea: 'box-4' }}>
        <div className="cartElement__amountContainer">
          <button
            className="button cartElement__button"
            disabled={data.amount === 1}
            onClick={() => changingAmount(data, 'decrease')}
          >
            <Icon iconSlug="Minus" />
          </button>
          <span className="cartElement__text">{data.amount}</span>
          <button
            className="button cartElement__button"
            onClick={() => changingAmount(data, 'increase')}
          >
            <Icon iconSlug="Plus" />
          </button>
        </div>
      </div>

      <div
        className="cartElement__priceContainer"
        style={{ gridArea: 'box-5' }}
      >
        <Price
          priceDiscount={totalPrice}
          priceDiscountClass="cartElement__priceDiscount"
          additionalClass="cartElement__price"
        />
      </div>
    </div>
  );
};
