import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import { ArrowRightIcon } from '../../assets/image/icons/ArrowRightIcon';
import { PlusIcon } from '../../assets/image/icons/PlusIcon';
import { MinusIcon } from '../../assets/image/icons/MinusIcon';
import { FavoritesIcon } from '../../assets/image/icons/FavoritesIcon';
import { SearchICon } from '../../assets/image/icons/SearchIcon';
import { CloseIcon } from '../../assets/image/icons/CloseIcon';
import { ButtonType } from '../../types/ButtonType';
import './Button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: ButtonType;
  direction?: 'up' | 'down' | 'right' | 'left';
};

export const Button: React.FC<Props> = ({
  content,
  direction,
  className = '',
  children,
  ...props
}) => {
  const SVG = {
    arrow: <ArrowRightIcon />,
    plus: <PlusIcon />,
    minus: <MinusIcon />,
    favorites: <FavoritesIcon />,
    search: <SearchICon />,
    close: <CloseIcon />,
  };

  const getButtonChildren = () => {
    return content === 'number'
      || content === 'text'
      || content === 'color'
      || content === 'image'
      ? children
      : SVG[content];
  };

  return (
    <button
      type="button"
      className={cn(
        'button',
        { [`button__${content}`]: content },
        { [`button__${content}--${direction}`]: direction },
        { [className]: className },
      )}
      {...props}
    >
      {getButtonChildren()}
    </button>
  );
};
