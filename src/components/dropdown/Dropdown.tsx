/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './dropdown.scss';

type Props = {
  listOptions: string[],
  selected: string,
  choosSelected: (item: string) => void,
  lengthList?: number
};

export const Dropdown:React.FC<Props> = (
  {
    listOptions,
    selected,
    choosSelected,
    lengthList = 1,
  },
) => {
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  const openMenu = () => {
    setActive(!active);
  };

  const choose = (item:string) => {
    choosSelected(item);
    setActive(false);
  };

  return (
    <div className="dropdown">
      <div
        className="currently-value"
        onClick={openMenu}
        onKeyDown={openMenu}
      >
        {selected}
        <img
          src="./img/icons/Right.png"
          alt="arrow"
          style={{ transform: `rotate(${active ? '-90deg' : '90deg'})` }}
        />
      </div>
      <div className={classNames('elements', {
        'active-menu': active,
      })}
      >
        {listOptions.map((el) => (
          <div
            onClick={() => choose(el)}
            onKeyDown={() => choose(el)}
            key={el}
            className={classNames('',
              {
                selected: el === selected,
                disable: lengthList ? lengthList < +el : false,
              })}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};
