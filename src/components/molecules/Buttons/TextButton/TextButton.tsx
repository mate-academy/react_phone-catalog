import classNames from 'classnames';

import { DefaultButton } from '../DefaultButton';
import { Typography } from '@/components/atoms';

import styles from './TextButton.module.scss';

type Props = React.ComponentProps<typeof DefaultButton> & {
  selected?: boolean;
};

export const TextButton = ({
  selected = false,
  className,
  children,
  ...props
}: Props) => {
  return (
    <DefaultButton
      {...props}
      className={classNames(styles.button, className)}
      data-selected={selected}
      aria-pressed={selected}
    >
      <Typography variant="button">{children}</Typography>
    </DefaultButton>
  );
};
