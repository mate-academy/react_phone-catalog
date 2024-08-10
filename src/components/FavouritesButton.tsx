import emptyHeart from '../images/icons/favourites-heart-like.svg';
import filledHeart from '../images/icons/favourites-filled-heart-like.svg';
import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  className?: string;
}

export const FavouritesButton: React.FC<Props> = ({
  active = false,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `flex aspect-square w-8 items-center justify-center border
      border-icons transition hover:border-primary`,
        active && 'border-elements',
        className,
      )}
      {...rest}
    >
      <img src={active ? filledHeart : emptyHeart} alt="Favourites icon" />
    </button>
  );
};
