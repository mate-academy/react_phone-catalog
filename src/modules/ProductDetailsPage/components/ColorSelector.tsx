import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import { getProductDetailsPath } from '../utilities/getProductDetailsPath';
import { COLOR_MAP } from '../constants/colors';
import type { FC } from 'react';
import { useTranslations } from 'use-intl';

interface Props {
  namespaceId: string;
  capacity: string;
  colorsAvailable: string[];
}

export const ColorSelector: FC<Props> = ({
  namespaceId,
  capacity,
  colorsAvailable,
}) => {
  const t = useTranslations('components');

  return (
    <div className="shadow-bottom shadow-elements dark:shadow-d-elements flex flex-col pb-6">
      <div className="text-small text-secondary dark:text-d-secondary">
        {t('availableColors')}
      </div>
      <ul className="mt-2 flex gap-2">
        {colorsAvailable.map(color => {
          return (
            <li key={color}>
              <NavLink
                to={getProductDetailsPath(namespaceId, capacity, color)}
                style={{ backgroundColor: COLOR_MAP[color] || color }}
                className={({ isActive }) =>
                  cn(
                    'shadow-outer dark:border-d-black m-px flex size-7.5 items-center justify-center rounded-full border-2 border-white transition outline-none',
                    isActive
                      ? 'shadow-primary dark:shadow-d-white'
                      : 'shadow-elements dark:shadow-d-elements hover:shadow-icons dark:hover:shadow-d-secondary',
                  )
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
