import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import { ButtonType } from '../../helpers/types/ButtonType';
import { RightBtn } from '../../assets/icons/RightBtn';
import { FavIcon } from '../../assets/icons/FavIcon';
import './Button.scss';
import { PlusIcon } from '../../assets/icons/PlusIcon';
import { MinusIcon } from '../../assets/icons/MinusIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { CloseIcon } from '../../assets/icons/CloseIcon';

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
    arrow: <RightBtn />,
    plus: <PlusIcon />,
    minus: <MinusIcon />,
    favorites: <FavIcon />,
    search: <SearchIcon />,
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
