/* eslint-disable no-console */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { storage } from '../../support/utility';
import { counter } from '../../store/store';

type Props = {
  itemID: string;
};
export const ButtonFavorite: React.FC<Props> = ({ itemID }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { fav, setCount } = counter();

  useEffect(() => {
    if (storage.isExist('favourites', itemID)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [fav]);

  return (
    <button
      type="button"
      className="flex items-center justify-center h-10 w-10 border border-elements hover:border-primary shadow"
      onClick={() => {
        storage.toggle('favourites', itemID);
        setIsSelected(!isSelected);
        setCount('favourites');
      }}
    >
      <img
        src={`./img/svg/favourites${isSelected ? '-fill' : ''}.svg`}
        alt="favorites"
      />
    </button>
  );
};
