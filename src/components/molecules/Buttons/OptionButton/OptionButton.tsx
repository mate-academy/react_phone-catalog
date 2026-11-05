import classNames from 'classnames';

import { Typography } from '@/components/atoms';
import { DefaultButton } from '../DefaultButton';

import styles from './OptionButton.module.scss';

type Props = React.ComponentProps<typeof DefaultButton> & {
  selected?: boolean;
};

export const OptionButton = ({
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
      aria-selected={selected}
    >
      <Typography variant="bodytext">{children}</Typography>
    </DefaultButton>
  );
};
