import { useContext, useEffect, useState } from 'react';

import './AddToCart.scss';
import { DispatchContext, StateContext } from '../../store/State';
import { MyButton } from '../UI/MyButton';

type Props = {
  id: string;
};

export const AddToCart: React.FC<Props> = ({ id }) => {
  const [favorite, setFavorite] = useState(false);
  const { favoriteProducts } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  function handleSetFavorite() {
    if (!favorite) {
      dispatch({ type: 'addFavorite', payload: id });
    } else {
      dispatch({ type: 'removeFavorite', payload: id });
    }
  }

  useEffect(() => {
    setFavorite(favoriteProducts.includes(id));
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [id, favoriteProducts]);

  return (
    <div className="add-to-cart__btnbox">
      <MyButton>Add to cart</MyButton>

      <button
        type="button"
        className="add-to-cart__favorite"
        onClick={handleSetFavorite}
      >
        {favorite
          ? <img src="img/icons/heart-red.svg" alt="favorite product" />
          : <img src="img/icons/heart.svg" alt="favorite product" />}
      </button>
    </div>
  );
};
