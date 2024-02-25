import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { ButtonType } from '../../helpers/types/ButtonType';
import { FavoritesIcon } from '../../assets/icons/FavoritesIcon';
import './Button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: ButtonType;
};

export const Button: React.FC<Props> = ({
  content,
  className = '',
  children,
  ...props
}) => {
  const SVG = {
    favorites: <FavoritesIcon />,
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
        { [className]: className },
      )}
      {...props}
    >
      {getButtonChildren()}
    </button>
  );
};
