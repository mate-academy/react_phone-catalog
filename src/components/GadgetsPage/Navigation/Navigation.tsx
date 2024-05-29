import React, { useState } from 'react';
import './NavigationStyles.scss';
import classNames from 'classnames';

const Navigation: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const pages = [1, 2, 3, 4];

  const handleClick = elem => {
    setSelectedPage(elem);
  };

  return (
    <div className="navigation__buttons">
      <button className="navigation__prev-button">
        <img src="icons/arrow-up-black.png" alt="" />
      </button>
      <div className="navigation__main-buttons">
        {pages.map(elem => (
          <button
            className={classNames('navigation__page', {
              'page--active': elem === selectedPage,
            })}
            onClick={() => handleClick(elem)}
            key={elem}
          >
            {elem}
          </button>
        ))}
      </div>
      <button className="navigation__next-button">
        <img src="icons/arrow-up-black.png" alt="" />
      </button>
    </div>
  );
};

export default Navigation;
