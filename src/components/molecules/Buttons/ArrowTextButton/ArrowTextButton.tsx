import classNames from 'classnames';

import { ArrowIcon, Typography } from '@/components/atoms';

import { DefaultButton } from '../DefaultButton';

import styles from './ArrowText.module.scss';

type Props = React.ComponentProps<typeof DefaultButton> & {
  direction?: 'up' | 'down' | 'left' | 'right';
  color?: 'black' | 'grey';
};

export const ArrowTextButton = ({
  direction = 'left',
  color = 'black',
  className,
  children,
  ...props
}: Props) => {
  return (
    <DefaultButton
      {...props}
      className={classNames(styles.button, className)}
    >
      <ArrowIcon
        direction={direction}
        black={color === 'black' && !props.disabled}
      />

      <Typography variant="smalltext">{children}</Typography>
    </DefaultButton>
  );
};
