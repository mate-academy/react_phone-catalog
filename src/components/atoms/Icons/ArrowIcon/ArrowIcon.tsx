import { Icon } from '../Icon';

import arrowDown from '@/shared/assets/icons/ArrowDown.svg?no-inline';
import arrowDownBlack from '@/shared/assets/icons/ArrowDownBlack.svg?no-inline';
import arrowLeft from '@/shared/assets/icons/ArrowLeft.svg?no-inline';
import arrowLeftBlack from '@/shared/assets/icons/ArrowLeftBlack.svg?no-inline';
import arrowRight from '@/shared/assets/icons/ArrowRight.svg?no-inline';
import arrowRightBlack from '@/shared/assets/icons/ArrowRightBlack.svg?no-inline';
import arrowUp from '@/shared/assets/icons/ArrowUp.svg?no-inline';
import arrowUpBlack from '@/shared/assets/icons/ArrowUpBlack.svg?no-inline';

const arrows = {
  up: {
    default: arrowUp,
    black: arrowUpBlack,
  },
  down: {
    default: arrowDown,
    black: arrowDownBlack,
  },
  left: {
    default: arrowLeft,
    black: arrowLeftBlack,
  },
  right: {
    default: arrowRight,
    black: arrowRightBlack,
  },
} as const;

type ArrowDirection = keyof typeof arrows;

type Props = {
  direction: ArrowDirection;
  black?: boolean;
  className?: string;
};

export const ArrowIcon = ({ direction, black, className }: Props) => {
  const icon = arrows[direction][black ? 'black' : 'default'];

  return (
    <Icon
      icon={icon}
      className={className}
    />
  );
};
