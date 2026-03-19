import { Icon } from '../../Icon';
import style from './AddToFavorite.module.scss';

type Props = {
  size: number;
  isFavorite: boolean;
  handleClick: () => void;
};

export const AddToFavorite: React.FC<Props> = ({
  size,
  isFavorite,
  handleClick,
}) => {
  return (
    <button
      type="button"
      className={style.addToFavorite}
      style={{ '--button-size': `${size}px` } as React.CSSProperties}
      onClick={handleClick}
      aria-label="Toggle favorite"
    >
      <Icon name={isFavorite ? 'isFavorite' : 'favorite'} />
    </button>
  );
};
