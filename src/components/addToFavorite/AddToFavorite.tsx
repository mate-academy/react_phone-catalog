import { useContext, useEffect, useState } from 'react';
import { setLocalStorageItem } from '../../helpers/util';
import { addFavorite, GlobalContext, removeFavorite } from '../../reducer';
import { Product } from '../../types/product';

import './addToFavorite.scss';

type Props = {
  product: Product;
};

export const AddToFavorite: React.FC<Props> = ({ product }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [selectedLike, setSelectedLike] = useState(false);

  const remove = () => {
    const list: Product[]
      = JSON.parse(localStorage.getItem('likeList') as string) || [];

    setSelectedLike(false);
    if (list.length) {
      setLocalStorageItem(
        'likeList',
        list.filter((el: Product) => el.age !== product.age),
      );
    }
  };

  const setLike = () => {
    dispatch({ type: addFavorite, product });
    setLocalStorageItem('likeList', [...state.favoriteProducts, product]);
  };

  const removeLike = () => {
    dispatch({ type: removeFavorite, age: product.age });
    remove();
  };

  useEffect(() => {
    if (state.favoriteProducts.some((el: Product) => el.age === product.age)) {
      setSelectedLike(true);
    } else {
      setSelectedLike(false);
    }
  }, [state.favoriteProducts, state.selectedProduct]);

  return (
    <button
      type="button"
      data-cy="addToFavorite"
      className="like-button"
      onClick={selectedLike ? removeLike : setLike}
    >
      <img
        className="hearth"
        src={`./img/icons/${selectedLike ? 'fullHearth.png' : 'Hearth.png'}`}
        alt="hearth"
      />
    </button>
  );
};
