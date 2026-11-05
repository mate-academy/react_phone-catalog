import { Icon } from '../Icon';

import menuIcon from '@/shared/assets/icons/Menu.svg?no-inline';

type Props = { className?: string };

export const MenuIcon = ({ className }: Props) => {
  return (
    <Icon
      icon={menuIcon}
      className={className}
    />
  );
};
