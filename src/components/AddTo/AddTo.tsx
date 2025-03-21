import cl from 'classnames';
import { Button } from '../Button';
import { useFavorite, useSetFavorite } from '../../context/FavoriteContext';
import { useSetShop, useShop } from '../../context/ShopContext';
import { Product } from '../../types/Product';
import s from './AddTo.module.scss';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type ToAdd = 'cart' | 'favorite';

type Props = {
  product: Product;
};

export const AddTo: React.FC<Props> = ({ product }) => {
  const { itemId } = product;
  const [alreadyExist, setAlreadyExist] = useState(false);

  const shop = useShop();
  const favorite = useFavorite();
  const setShop = useSetShop();
  const setFavorite = useSetFavorite();

  const isItem = (toCheck: ToAdd) =>
    toCheck === 'cart'
      ? shop.some(f => f.itemId === itemId)
      : favorite.some(f => f.itemId === itemId);

  const handleAdd = async (toAdd: ToAdd) => {
    if (toAdd === 'cart') {
      if (!isItem('cart')) {
        setShop([...shop, product]);

        return;
      }

      setAlreadyExist(true);
      setTimeout(() => {
        setAlreadyExist(false);
      }, 3000);
    } else {
      setFavorite(
        isItem('favorite')
          ? favorite.filter(f => f.itemId !== itemId)
          : [...favorite, product],
      );
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

      {isItem('favorite') ? (
        <Button
          direction="heartFilled"
          isHeart
          onClick={() => handleAdd('favorite')}
        />
      ) : (
        <Button
          direction="heart"
          isHeart
          onClick={() => handleAdd('favorite')}
        />
      )}
    </div>
  );
};
