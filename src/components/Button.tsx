import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import { ArrowRightIcon } from '../assets/images/icons/ArrowRightIcon';
import { PlusIcon } from '../assets/images/icons/PlusIcon';
import { MinusIcon } from '../assets/images/icons/MinusIcon';
import { FavouritesIcon } from '../assets/images/icons/FavouritesIcon';
import { SearchICon } from '../assets/images/icons/SearchIcon';
import { CloseIcon } from '../assets/images/icons/CloseIcon';
import { ButtonType } from '../types/ButtonType';

import '../styles/blocks/button.scss';

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
    favourites: <FavouritesIcon />,
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
