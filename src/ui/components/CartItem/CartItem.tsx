import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { SelectNumber } from '../SelectNumber';
import { Icon, Loader, Typography, Button } from '../../base';
import { ProductCart } from '../../../types/Product';

import './CartItem.scss';

type Props = {
  item: ProductCart;
  onChangeQty: (idX: string, qty: number) => Promise<void>;
  onDeleteItem: (item: ProductCart) => Promise<void>;
};

export const CartItem: React.FC<Props> = ({
  item,
  onChangeQty,
  onDeleteItem,
}) => {
  const [qty, setQty] = useState<number>(item.cartQty);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOnChangeQty = (newQty: number) => {
    setIsLoading(true);

    onChangeQty(item.itemId, newQty)
      .then(() => {
        setQty(newQty);
      })
      .catch(e => new Error(e))
      .finally(() => setIsLoading(false));
  };

  const handleOnDeleteItem = () => {
    setIsLoading(true);

    onDeleteItem(item).finally(() => setIsLoading(false));
  };

  return (
    <div className="cart-item">
      {isLoading && <Loader classModifier="cart-item__loader" />}
      <Button
        type="default"
        borderless
        cypressParam="cartDeleteButton"
        onClickHandler={handleOnDeleteItem}
      >
        <Icon id="cross" width={10} height={10} className="cart-item__close" />
      </Button>
      <Link
        className="cart-item__link"
        aria-label={item.name}
        to={`../${item.category}/${item.itemId}`}
      >
        <div className="cart-item__content">
          <div className="cart-item__image">
            <img src={item.image} alt={item.name} />
          </div>
          <h3 className="cart-item__title">{item.name}</h3>
        </div>
      </Link>
      <SelectNumber
        startValue={qty}
        onChange={v => handleOnChangeQty(v)}
        className="cart-item__select-number"
        cypressParam="productQauntity"
      />
      <Typography type="title" level="2" className="cart-item__price">
        {`$${qty * item.price}`}
      </Typography>
    </div>
  );
};
