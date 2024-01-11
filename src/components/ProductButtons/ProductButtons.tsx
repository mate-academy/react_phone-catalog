import classNames from 'classnames';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import { Product } from '../../types/Product';
import './ProductButtons.scss';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

type Props = {
  product?: Product,
};

export const ProductButtons: React.FC<Props> = ({ product }) => {
  const {
    cart,
    favList,
    handleAddingToCart,
    handleAddingToFav,
  } = useContext(GlobalContext);
  const location = useLocation();

  if (!product) {
    return <NotFoundPage />;
  }

  const { id } = product;

  const isProductDetailsPage = location.pathname === `/phones/${id}`;
  const isAddedToCart = cart.find(item => item.product.id === id);
  const isAddedToFav = favList.find(item => item.id === id);

  return (
    <div className="buttons">
      <button
        type="button"
        className={classNames('buttons__cart', {
          'buttons__cart--added': isAddedToCart,
          'buttons__cart--large': isProductDetailsPage,
        })}
        onClick={() => handleAddingToCart(product)}
      >
        {isAddedToCart
          ? 'Added to cart'
          : 'Add to cart'}
      </button>

      <button
        type="button"
        aria-label="favourites"
        className={classNames('buttons__favourite', {
          'buttons__favourite--added': isAddedToFav,
          'buttons__favourite--large': isProductDetailsPage,
        })}
        onClick={() => handleAddingToFav(product)}
      />
    </div>
  );
};
