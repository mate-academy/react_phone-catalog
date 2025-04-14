import './ProductCardButtons.style.scss';
import classNames from 'classnames';

import { LocalStorageContext } from '../../../../app/Contexts/LocalStorageContext';
import { useContext } from 'react';

import favIconFilled from '../../../../../public/icons/favourites-filled.svg';
import favIcon from '../../../../../public/icons/favourites.svg';
import { useAppSelector } from '../../../../app/hooks';

type Props = {
  id: string;
  productPage?: boolean;
};

export const ProductCardButtons: React.FC<Props> = ({ id, productPage }) => {
  const { cartItems, favItems, updateFavList, updateCart } =
    useContext(LocalStorageContext);

  const isFav = favItems.some(item => item.itemId === id);
  const isInCart = cartItems.some(item => item.itemId === id);

  const product = useAppSelector(state => state.products.products).find(product => product.itemId === id);

  return (
    <div className="buttons">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (product) {
            updateCart(product)
          }
        }}
        className={classNames(
          'buttons__add-to-cart',
          { "buttons__add-to-cart__selected": isInCart },
          {"buttons__add-to-cart--product-page": productPage}
        )}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <div
        onClick={(e) => {
          e.stopPropagation();
          if(product) {
            updateFavList(product)
          }
        }}
        className={classNames("buttons__add-to-fav", {"buttons__add-to-fav--product-page": productPage})}
      >
        <img
          className="fav-icon"
          src={isFav ? favIconFilled : favIcon}
          alt="add / delete favorite"
        />
      </div>
    </div>
  );
};
