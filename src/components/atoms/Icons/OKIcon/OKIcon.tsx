import { Icon } from '../Icon';

import okIcon from '@/shared/assets/icons/OK.svg?no-inline';

type Props = { className?: string };

export const OKIcon = ({ className }: Props) => {
  return (
    <Icon
      icon={okIcon}
      className={className}
    />
  );
};
