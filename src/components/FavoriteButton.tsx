import { useState } from 'react';
import classNames from 'classnames';
import { checkIsFavorite, favListChange } from '../helpers/favoriteTab';

type Props = {
  id: string,
  bigButton?: boolean,
};

export const FavoriteButton: React.FC<Props> = ({
  id, bigButton,
}) => {
  const [
    isFavorite,
    setIsFavorite,
  ] = useState<boolean>(checkIsFavorite(id));

  const handleFavoriteButton = () => {
    setIsFavorite(prev => !prev);
    favListChange(id);
  };

  return (
    <button
      type="button"
      aria-label="favorite-button"
      onClick={handleFavoriteButton}
      value={id}
      className={classNames('favorite-button', {
        active: isFavorite,
        'favorite-button--big': bigButton,
      })}
    />
  );
};
