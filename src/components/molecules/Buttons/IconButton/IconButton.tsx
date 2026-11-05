import classNames from 'classnames';

import { DefaultButton } from '../DefaultButton';

type Props = Omit<React.ComponentProps<typeof DefaultButton>, 'children'> & {
  selected?: boolean;
  iconInactive: React.ReactNode;
  iconActive: React.ReactNode;
};

export const IconButton = ({
  selected = false,
  iconInactive,
  iconActive,
  className,
  ...props
}: Props) => {
  return (
    <DefaultButton
      {...props}
      className={classNames(className)}
      data-selected={selected}
      aria-pressed={selected}
    >
      {selected ? iconActive : iconInactive}
    </DefaultButton>
  );
};
