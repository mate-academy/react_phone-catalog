import { Icon } from '../Icon';

import closeIcon from '@/shared/assets/icons/Close.svg?no-inline';

type Props = { className?: string };

export const CloseIcon = ({ className }: Props) => {
  return (
    <Icon
      icon={closeIcon}
      className={className}
    />
  );
};
