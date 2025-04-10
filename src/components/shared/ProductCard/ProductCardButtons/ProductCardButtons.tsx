import './ProductCardButtons.style.scss';
import classNames from 'classnames';

import { Product } from '../../../../types/Product';
import { LocalStorageContext } from '../../../../app/Contexts/LocalStorageContext';
import { useContext } from 'react';

import favIconFilled from '../../../../../public/icons/favourites-filled.svg';
import favIcon from '../../../../../public/icons/favourites.svg';

type Props = {
  product: Product;
};

export const ProductCardButtons: React.FC<Props> = ({ product }) => {
  const { id } = product;

  const { cartItems, favItems, updateFavList, updateCart } =
    useContext(LocalStorageContext);

  const isFav = favItems.some(item => item.id === id);
  const isInCart = cartItems.some(item => item.id === id);

  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => updateCart(product)}
        className={classNames(
          'buttons__add-to-cart',
          { selected: isInCart },
        )}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <div
        onClick={() => updateFavList(product)}
        className="buttons__add-to-fav"
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
