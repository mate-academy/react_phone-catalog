import classNames from 'classnames';
import './Button.scss';
import { useProducts } from '../ProductContext';
import { Product } from '../../type/Product';

type Props = {
  name: string,
  product: Product,
};

export const Button: React.FC<Props> = ({ name, product }) => {
  const {
    getArrayUpdates,
    isProductAdded,
    carts,
    setCarts,
    favourites,
    setFavourites,
  } = useProducts();

  const isProductInCart = isProductAdded(carts, product.id);
  const isProductInFavourites = isProductAdded(favourites, product.id);

  const handleButtonClick = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    let updatesProducts = [];

    if (action === 'cart') {
      updatesProducts = getArrayUpdates(carts, product);
      setCarts(updatesProducts);
    }

    if (action === 'favourites') {
      updatesProducts = getArrayUpdates(favourites, product);
      setFavourites(updatesProducts);
    }
  };

  return (
    <div className="button">
      <button
        type="submit"
        className={classNames(
          'button__add',
          { 'button__add--selected': isProductInCart },
          { 'button__add--details': name === 'details' },
        )}
        onClick={(e) => handleButtonClick(e, 'cart')}
      >
        {isProductInCart ? (
          'Added to cart'
        ) : (
          'Add to cart'
        )}
      </button>

      <button
        type="submit"
        title="favourites"
        data-cy="addToFavorite"
        className={classNames(
          'button__fav',
          { 'button__fav--details': name === 'details' },
        )}
        onClick={(e) => handleButtonClick(e, 'favourites')}
      >
        <span className={classNames(
          'icon',
          'icon--favourites',
          { 'icon--favourites-red': isProductInFavourites },
        )}
        />
      </button>
    </div>
  );
};
