import { ICONS } from '../../../constants/icons';
import { ButtonCart } from '../../atoms/Buttons/ButtonCart';
import { ButtonIcon } from '../../atoms/Buttons/ButtonIcon';
import cn from 'classnames';

type Props = {
  handleSelectClick: () => void;
  isSelected: boolean;
  isLiked: boolean;
  handleLikeClick: () => void;
};

export const ProductSelectActions: React.FC<Props> = ({
  handleLikeClick,
  handleSelectClick,
  isSelected,
  isLiked,
}) => (
  <div className="flex gap-2 ">
    <ButtonCart
      handleClick={handleSelectClick}
      isSelected={isSelected}
      className="flex-1 h-10 hover-zoom-small cursor-pointer"
      content="Add to cart"
      onSelected="Added to cart"
    />
    <ButtonIcon
      className={cn(
        'w-10 h-10 flex items-center justify-center hover-zoom-small cursor-pointer',
        {
          'dark:bg-surface-2-dark': !isLiked,
          'dark:bg-primary': isLiked,
        },
      )}
      isSelected={isLiked}
      handleClick={handleLikeClick}
      src={isLiked ? ICONS.HEART_FILLED : ICONS.HEART_EMPTY}
      animateIcon={true}
    />
  </div>
);
