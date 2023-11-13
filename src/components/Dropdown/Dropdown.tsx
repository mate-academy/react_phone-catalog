import React, { useState } from 'react';
import cn from 'classnames';
import { ICONS } from '../../icons';
import { SearchLink } from '../SearchLink';
import './Dropdown.scss';

type Props = {
  title: string,
  option: string,
  DATA: {
    id: string;
    title: string;
  }[],
  paramName: string;
};

export const Dropdown: React.FC<Props> = React.memo(({
  title,
  option,
  DATA,
  paramName,
}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="dropdown-box">
      <p className="dropdown-box__title">
        {title}
      </p>

      <div
        className={cn('dropdown', { 'dropdown__is-active': isShow })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className={cn('button button--dropdown', {
              'button--dropdown-small': paramName === 'perPage',
            })}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setIsShow(!isShow)}

          >
            <span className="button__text">
              {DATA.find(item => item.id === option)?.title}
            </span>

            <img
              src={ICONS.arrow}
              alt="Dropdown close"
              className={cn('icon', { 'icon--down': !isShow })}
            />
          </button>
        </div>

        <div className={cn('dropdown__menu', {
          'dropdown__menu--small': paramName === 'perPage',
        })}
        >
          <div className="dropdown__content">
            {DATA.map(item => (
              <SearchLink
                params={{
                  [paramName]: item.id || null,
                  page: '1',
                }}
                key={item.id}
                onClick={() => {
                  setIsShow(false);
                }}
                className="dropdown__item"
              >
                {item.title}
              </SearchLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
