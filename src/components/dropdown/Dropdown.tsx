/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import { useState } from 'react';
import './dropdown.scss';

type Props = {
  listOptions: string[],
  selected: string,
  choosSelected: (item: string) => void
};

export const Dropdown:React.FC<Props> = (
  {
    listOptions,
    selected, choosSelected,
  },
) => {
  const [active, setActive] = useState(false);

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
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};
