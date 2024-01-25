import { createElement } from 'react';
import { IconsComponents } from './libs/icons';
import { IconColors, IconNames } from '../../enums';
import { IconOptionsType } from '../../types';

type Props = {
  icon: IconNames;
  className?: string;
  options?: IconOptionsType;
  children?: React.ReactNode;
};

export const Icon: React.FC<Props> = ({
  icon,
  className,
  options = {},
  children,
  ...rest
}) => {
  const {
    color = IconColors.DARK_GREY,
    width,
    height,
    rotate,
  } = options;

  return (
    <div
      className={className}
      aria-label={icon}
      role="img"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      {...rest}
    >
      {createElement(IconsComponents[icon], {
        style: { fill: color, width, height },
      })}
      {children}
    </div>
  );
};
