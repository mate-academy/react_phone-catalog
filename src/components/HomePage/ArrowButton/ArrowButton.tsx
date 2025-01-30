import cl from './ArrowButton.module.scss';
import cn from 'classnames';

export enum ArrowButtonDirection {
  LEFT = 'Left',
  RIGHT = 'Right',
  UP = 'Up',
}
export enum ArrowButtonOrigin {
  ONSLIDER = 'onSlider',
  ONLIST = 'onList',
  ONFOOTER = 'onFooter',
}

type Props = {
  direction: ArrowButtonDirection;
  onClick: () => void;
  origin: ArrowButtonOrigin;
  disabled?: boolean;
  className?: string;
};

export const ArrowButton: React.FC<Props> = ({
  direction,
  onClick = () => {},
  origin,
  disabled = false,
  className,
}) => {
  return (
    <button
      className={cn(cl.arrowButton, className, {
        [cl.buttonOnSlider]: origin === ArrowButtonOrigin.ONSLIDER,
        [cl.buttonOnList]:
          origin === ArrowButtonOrigin.ONLIST ||
          origin === ArrowButtonOrigin.ONFOOTER,
        [cl.disabled]: disabled,
      })}
      onClick={onClick}
    >
      <svg
        className={cn(cl.icon, cl[direction], {
          [cl.disabledLeft]:
            disabled && direction === ArrowButtonDirection.LEFT,
          [cl.disabledRight]:
            disabled && direction === ArrowButtonDirection.RIGHT,
        })}
      />
    </button>
  );
};
