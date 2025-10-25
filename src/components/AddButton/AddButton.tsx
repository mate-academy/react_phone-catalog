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

  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const inCart = cart.find(i => i === id);

    if (!inCart) {
      setCart(prev => [...prev, id]);
    }
  };

  useEffect(() => {
    const inCart = cart.find(i => i === id);

    if (!inCart) {
      setButtonText('Add to cart');
    } else {
      setButtonText('Added to cart');
    }
  }, [cart, id]);

  return (
    <button onClick={e => addToCart(e)} className={classNames(styles.cart)}>
      {buttonText}
    </button>
  );
};
