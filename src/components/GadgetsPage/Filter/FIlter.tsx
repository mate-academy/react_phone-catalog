import React, { useEffect, useRef, useState } from 'react';
import './FilterStyle.scss';
import classNames from 'classnames';

interface Props {
  title: string;
  items: string[];
}

const Filter: React.FC<Props> = ({ title, items }) => {
  const [selected, setSelected] = useState('select');
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getRandom = () => {
    const date = new Date();

    return date.getTime();
  };

  const handleClick = (elem: string) => {
    if (active) {
      setSelected(elem);
      setActive(false);

      return;
    }

    setActive(true);
  };

  const handleOpen = () => {
    setActive(!active);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown__title">{title}</div>
      <div className="dropdown__menu--wrapper">
        <button className="dropdown__menu--main" onClick={() => handleOpen()}>
          <div className="dropdown__menu--title">{selected}</div>
          <img
            className={classNames('dropdown__menu--arrow', {
              'arrow--rotate': active,
            })}
            src="icons/arrow-up-black.png"
          />
        </button>
        <ul
          className={classNames('dropdown__select', {
            'dropdown__menu--active': active,
          })}
        >
          {items.map(elem => (
            <li
              value={elem}
              className="dropdown__menu--item"
              onClick={() => handleClick(elem)}
              key={getRandom() + elem}
            >
              {elem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
