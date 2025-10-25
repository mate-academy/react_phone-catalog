import { useContext, useEffect, useState } from 'react';
import { ActionsContext, StateContext } from '../../../utils/GlobalContext';
import { Icon } from '../../Icon';
import styles from './Fav.module.scss';
import classNames from 'classnames';

type Props = {
  id: number;
};

export const Fav: React.FC<Props> = ({ id }) => {
  const { favourites } = useContext(StateContext);
  const { setFavourites } = useContext(ActionsContext);
  const [FavImg, setFavImg] = useState('/img/icons/favourites.svg');

  const toggleFavourites = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const isInFavourites = favourites.find(f => f === id);

    if (!isInFavourites) {
      setFavourites(prev => [...prev, id]);
    } else {
      setFavourites(prev => prev.filter(f => f !== id));
    }
  };

  useEffect(() => {
    if (favourites.find(f => f === id)) {
      setFavImg('/img/icons/favouritesFilled.svg');
    } else {
      setFavImg('/img/icons/favourites.svg');
    }
  }, [favourites, id]);

  return (
    <div
      onClick={e => toggleFavourites(e)}
      aria-label="add to favoutites"
      className={classNames(styles.fav, {
        [styles.fav__in]: favourites.includes(id),
      })}
    >
      <Icon path={`${FavImg}`} name="favourites" />
    </div>
  );
};
