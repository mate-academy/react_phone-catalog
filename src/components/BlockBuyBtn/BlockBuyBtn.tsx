import React, { useEffect } from 'react';
import classNames from 'classnames';
import {
  useAppDispatch,
  useAppSelector,
  useLocaleStorage,
} from '../../app/hooks';
import { basketItems, favoriteItems } from '../../app/store';
import { addItemBasket, removeItemBasket } from '../../feature/basket';
import { addFavorite, removeFavorite } from '../../feature/favorite';
import { Product } from '../../type/Product';
import './BlockBuyBtn.scss';

type Props = {
  item: Product;
};

export const BlockBuyBtn: React.FC<Props> = ({ item }) => {
  const [favorite, setFavorite]
    = useLocaleStorage<Product[]>('prodFavorite', []);
  const [basket, setBasket] = useLocaleStorage<Product[]>('prodBuy', []);

  const { favoriteItem } = useAppSelector(favoriteItems);
  const { basketItem } = useAppSelector(basketItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setBasket(basketItem);
  }, [basketItem]);

  useEffect(() => {
    setFavorite(favoriteItem);
  }, [favoriteItem]);
  const findProduct = basket.find(p => p.id === item.id);

  const addItemCard = (product: Product) => {
    if (findProduct) {
      dispatch(removeItemBasket(product));
      return;
    }
  
    dispatch(addItemBasket(product));
  };

  const someProduct = (productItems: Product[], product: Product) => {
    return productItems.some(i => i.id === product.id);
  };

  

  const addItemFavorite = (product: Product) => {
    const findItem = someProduct(favorite, product);

    if (findItem) {
      dispatch(removeFavorite(item));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <>
      <button
        onClick={() => addItemCard(item)}
        className={classNames(
          'card__btn',
          'card__btn--buy',
          { select: someProduct(basket, item) },
        )}
        type="button"
        aria-label="btn-buy"
      >
        {basket.some((i) => i.id === item.id) ? 'Selected' : 'Add to cart'}
        {findProduct
          && Object.hasOwnProperty.call(findProduct, 'quantity')
          && findProduct.quantity > 1
          ? `(${findProduct.quantity})`
          : ''}
      </button>

      <button
        onClick={() => addItemFavorite(item)}
        className={classNames(
          'card__btn',
          'card__btn--like',
          { liked: someProduct(favorite, item) },
        )}
        type="button"
        aria-label="btn"
      />
    </>
  );
};
