import classNames from 'classnames';

import { ArrowIcon } from '@/components/atoms';

import { DefaultButton } from '../DefaultButton';

import styles from './ArrowButton.module.scss';

type ArrowDirection = 'up' | 'down' | 'left' | 'right';

type Props = Omit<React.ComponentProps<typeof DefaultButton>, 'children'> & {
  direction: ArrowDirection;
  color?: 'black' | 'grey';
};

export const ArrowButton = ({
  onClick,
  direction,
  disabled = false,
  color = 'black',
  className,
  'aria-label': ariaLabel,
}: Props) => {
  return (
    <DefaultButton
      onClick={onClick}
      className={classNames(styles.button, className)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <ArrowIcon
        direction={direction}
        black={color === 'black' && !disabled}
      />
    </DefaultButton>
  );
};
