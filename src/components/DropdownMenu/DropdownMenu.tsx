import { FC, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import { Filter } from '../../types/Filter';
import './DropdownMenu.scss';

type Props = {
  title: string;
  options: Filter[],
  initialValue: string;
  searchParamsKey: string,
};

export const DropdownMenu: FC<Props> = ({
  title,
  options,
  initialValue,
  searchParamsKey,
}) => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div className="dropdown-menu">
      <span className="dropdown-menu__title">{title}</span>
      <button
        type="button"
        className={className('dropdown-menu__button', {
          'dropdown-menu__button--active': isOpen,
        })}
        onClick={toggleList}
      >
        {initialValue}
        {isOpen ? (
          <img
            src="icons/topArrowLight.svg"
            alt="collapse dropdown menu"
          />
        ) : (
          <img
            src="icons/bottomArrow.svg"
            alt="expand dropdown menu"
          />
        )}
      </button>

      {isOpen && (
        <ul className="dropdown-menu__list">
          {options.map(({ name, value }) => (
            <li
              role="presentation"
              className="dropdown-menu__item"
              key={value}
              onClick={toggleList}
            >
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    [searchParamsKey]: value,
                    page: '1',
                  }),
                }}
                className="dropdown-menu__item-link"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
