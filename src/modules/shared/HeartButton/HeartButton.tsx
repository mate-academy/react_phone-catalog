import classNames from 'classnames';
import globalStyle from '../../../styles/index.module.scss';
import { Heart } from 'lucide-react';

interface HeartButtonProps {
  inFavorites: boolean;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ inFavorites }) => {
  return (
    <Heart
      className={classNames([globalStyle.iconHeart], {
        [globalStyle.iconHeartActive]: inFavorites,
      })}
    />
  );
};
