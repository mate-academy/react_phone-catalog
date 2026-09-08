/* eslint-disable max-len */
import cl from 'classnames';
import s from './AddTo.module.scss';
import * as favoritesActions from '../../store/favorites';
import * as cartActions from '../../store/cart';
import HeartIcon from '../../img/icons/icon-heart.svg?react';
import { Product } from '../../types/Product';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../hooks';

type ToAdd = 'cart' | 'favorite';

type Props = {
  product: Product;
};

export const AddTo: React.FC<Props> = ({ product }) => {
  const { id } = product;
  const [alreadyExist, setAlreadyExist] = useState(false);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);
  const cart = useAppSelector(state => state.cart);

  const isItem = (toCheck: ToAdd) =>
    toCheck === 'cart'
      ? cart.find(e => e.id === id)
      : favorites.find(e => e.id === id);

  const handleAdd = async (toAdd: ToAdd) => {
    if (toAdd === 'cart') {
      if (!isItem('cart')) {
        dispatch(cartActions.add(product));

        return;
      }

      setAlreadyExist(true);
      setTimeout(() => {
        setAlreadyExist(false);
      }, 3000);
    } else {
      if (isItem('favorite')) {
        dispatch(favoritesActions.remove(id));

        return;
      }

      dispatch(favoritesActions.add(product));
    }
  };

  return (
    <div className={s.AddTo}>
      <button
        disabled={alreadyExist}
        onClick={() => handleAdd('cart')}
        className={cl(s.AddTo__addToCard, {
          [s.AddTo__selected]: isItem('cart'),
        })}
      >
        {isItem('cart') ? 'Added to card' : 'Add to card'}
        <AnimatePresence>
          {alreadyExist && (
            <motion.div
              className={s.AddTo__message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              This item is already in your cart
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <button
        className={s.AddTo__heartButton}
        onClick={() => handleAdd('favorite')}
      >
        <HeartIcon
          className={cl(s.AddTo__heartIcon, {
            [s.AddTo__heartIconFilled]: isItem('favorite'),
          })}
        />
      </button>
    </div>
  );
};
