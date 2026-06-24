import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import { getProductDetailsPath } from '../utilities/getProductDetailsPath';
import { formatMemory } from '../../shared/utilities/formatMemory';
import type { FC } from 'react';
import { useTranslations } from 'use-intl';

interface Props {
  namespaceId: string;
  capacityAvailable: string[];
  color: string;
}

export const CapacitySelector: FC<Props> = ({
  namespaceId,
  capacityAvailable,
  color,
}) => {
  const t = useTranslations('components');

  return (
    <div className="shadow-bottom shadow-elements dark:shadow-d-elements mt-6 flex flex-col pb-6">
      <div className="text-small text-secondary dark:text-d-secondary">
        {t('selectCapacity')}
      </div>
      <ul className="mt-2 flex gap-2">
        {capacityAvailable.map(capacity => (
          <li key={capacity}>
            <NavLink
              to={getProductDetailsPath(namespaceId, capacity, color)}
              className={({ isActive }) =>
                cn(
                  'text-body flex h-8 items-center justify-center px-2 transition outline-none',
                  isActive
                    ? 'bg-primary dark:bg-d-white dark:text-d-black text-white'
                    : 'shadow-icons dark:shadow-d-icons text-primary dark:text-d-white hover:shadow-primary dark:hover:shadow-d-secondary shadow-inner',
                )
              }
            >
              {formatMemory(capacity)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
