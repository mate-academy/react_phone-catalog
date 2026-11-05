import { Icon } from '../Icon';

import homeIcon from '@/shared/assets/icons/Home.svg?no-inline';

type Props = { className?: string };
export const HomeIcon = ({ className }: Props) => {
  return (
    <Icon
      icon={homeIcon}
      className={className}
    />
  );
};
