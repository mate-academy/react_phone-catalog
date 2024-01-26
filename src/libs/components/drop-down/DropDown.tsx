import { useSearchParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import classNames from 'classnames';

import './styles.scss';

import { useOutsideClick } from '../../hooks';
import { ButtonViews, IconNames, SearchParams } from '../../enums';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { searchFields } from './libs/search-fields';
import { SearchLink } from '../SearchLink';

type Props = {
  label: string,
  fields: SearchParams.SORT | SearchParams.PER_PAGE,
  className?: string,
};

export const Dropdown: React.FC<Props> = ({ label, fields, className }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get(fields);

  const dropdownItems = searchFields[fields];
  const index = dropdownItems.findIndex(item => item.value === searchValue);
  const selected = index === -1 ? dropdownItems[0] : dropdownItems[index];

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleSelect = () => {
    setIsOpenMenu(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    setIsOpenMenu(false);
  });

  return (
    <div
      className={classNames(className, 'dropdown')}
      ref={dropdownRef}
    >
      <div className="dropdown__lable">{label}</div>

      <Button
        className="dropdown__button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        view={ButtonViews.DROPDOWN}
        selected={isOpenMenu}
        onClick={handleOpenMenu}
      >
        {selected.name}
        <Icon
          icon={IconNames.ARROW}
          options={{ rotate: isOpenMenu ? -90 : 90 }}
        />
      </Button>

      <div
        className={classNames('dropdown__menu', {
          'dropdown__menu--active': isOpenMenu,
        })}
        role="menu"
      >
        <ul className="dropdown__list">
          {dropdownItems.map(item => (
            <li
              key={item.name}
              className="dropdown__item"
            >
              <SearchLink
                params={{
                  [fields]: item.value || null,
                  [SearchParams.PAGE]: null,
                }}
                className={classNames('dropdown__link', {
                  'dropdown__link--active': item.value === selected.value,
                })}
                onClick={handleSelect}
              >
                {item.name}
              </SearchLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
