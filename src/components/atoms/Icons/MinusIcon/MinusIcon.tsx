import { Icon } from '../Icon';

import minusIcon from '@/shared/assets/icons/Minus.svg?no-inline';

type Props = { className?: string };

export const MinusIcon = ({ className }: Props) => {
  return (
    <Icon
      icon={minusIcon}
      className={className}
    />
  );
};
