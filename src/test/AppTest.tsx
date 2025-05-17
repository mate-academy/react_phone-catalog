import React from 'react';
import './AppTest.scss';
import classNames from 'classnames';

export const AppTest = () => {
  const list = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div className="AppTest">
      <div className="page">
        <div className="page__content">
          <nav className="nav">
            <ul className="nav__list">
              {list.map(value => {
                const isLast = value === list.length;

                return (
                  <li
                    key={value}
                    className={classNames('nav__item', {
                      ['nav__item--last']: isLast,
                    })}
                  >
                    <span className="nav__label">
                      Lorem ipsum dolor sit amet
                    </span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
