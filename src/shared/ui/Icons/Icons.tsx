import style from './Icons.module.scss';
import icons from '../../../assets/sprite.svg';
import { IconProps } from '../../../types/icons';
import classNames from 'classnames';

export const Icons: React.FC<IconProps> = ({
  id,
  directions,
  filled,
  className,
}) => {
  return (
    <svg
      className={classNames(
        style.icon,
        directions && style[directions],
        filled && style[filled],
        className,
      )}
    >
      <use href={`${icons}#${id}`}></use>
    </svg>
  );
};
