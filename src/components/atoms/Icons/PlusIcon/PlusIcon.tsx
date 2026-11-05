import { Icon } from '../Icon';

import plusIcon from '@/shared/assets/icons/Plus.svg?no-inline';

type Props = { className?: string };

export const PlusIcon = ({ className }: Props) => {
  return (
    <Icon
      icon={plusIcon}
      className={className}
    />
  );
};
