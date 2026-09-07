import { useContext, useEffect, useState } from 'react';
import styles from './AddButton.module.scss';
import { ActionsContext, StateContext } from '../../utils/GlobalContext';
import classNames from 'classnames';

type Props = {
  id: number;
};

export const AddButton: React.FC<Props> = ({ id }) => {
  const { cart } = useContext(StateContext);
  const { setCart } = useContext(ActionsContext);
  const [buttonText, setButtonText] = useState('');
  const [inCart, setInCart] = useState(false);

  const toggleInCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!inCart) {
      setCart(prev => [...prev, id]);
      setInCart(true);
    } else {
      setInCart(false);
      setCart(prev => prev.filter(el => el !== id));
    }
  };

  useEffect(() => {
    setInCart(cart.find(i => i === id) ? true : false);

    if (!inCart) {
      setButtonText('Add to cart');
    } else {
      setButtonText('Added to cart');
    }
  }, [cart, id, inCart]);

  return (
    <button
      onClick={e => toggleInCart(e)}
      className={classNames(styles.cart, { [styles.cart__added]: inCart })}
    >
      {buttonText}
    </button>
  );
};
