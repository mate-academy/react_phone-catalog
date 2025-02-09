import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CartContext } from '../Contexts/CartContext';

type Props = {
  itemId: string;
};

export const PrimaryButton: React.FC<Props> = ({ itemId }) => {
  const { addedProducts, addCartProduct, checkCartProduct } =
    useContext(CartContext);

  const [active, setActive] = useState(false);

  const handleAdd = () => {
    if (active) {
      return;
    }

    addCartProduct(itemId);
    setActive(true);
  };

  useEffect(() => {
    setActive(checkCartProduct(itemId));
  }, [addedProducts]);

  return (
    <button
      className={classNames('button primaryBtn', {
        'primaryBtn-active': active,
      })}
      onClick={handleAdd}
    >
      <span className="buttonText">{active ? 'Added' : 'Add to cart'}</span>
    </button>
  );
};
