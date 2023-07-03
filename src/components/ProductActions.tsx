import { useContext } from 'react';
import classnames from 'classnames';
import { Context } from '../utils/Context';
import { Cart } from '../utils/types/Cart';
import { Product } from '../utils/types/Product';

type Props = {
  product: Product,
};

export const ProductActions:React.FC<Props> = ({ product }) => {
  const {
    editCartItem,
    cartList,
    favourites,
    addFavourite,
  } = useContext(Context);

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
  };

  const checkingAorAvailability = (list: Product[] | Cart[]) => list
    .some(item => item.id === product.id);

  return (
    <div className="actions">
      <button
        className={classnames('actions--button',
          {
            'actions--button--disabled': checkingAorAvailability(cartList),
          })}
        onClick={() => editCartItem(cartItem, null)}
        type="submit"
      >
        Add to cart
      </button>
      <button
        data-cy="addToFavorite"
        className="actions--add-favorite"
        type="submit"
        onClick={() => addFavourite(product)}
      >
        <img
          src={`/assests/images/${!checkingAorAvailability(favourites)
            ? 'Favourites.svg'
            : 'Favourites Filled.svg'}`}
          alt="heart-icon"
        />
      </button>
    </div>
  );
};
