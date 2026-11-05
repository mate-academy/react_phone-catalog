import { Icon } from '../Icon';

import searchIcon from '@/shared/assets/icons/Search.svg?no-inline';

type Props = { className?: string };

export const SearchIcon = ({ className }: Props) => {
  return (
    <Icon
      icon={searchIcon}
      className={className}
    />
  );
};
