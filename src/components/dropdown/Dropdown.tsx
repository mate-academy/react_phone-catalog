/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './dropdown.scss';

type Props = {
  listOptions: string[];
  selected: string;
  choosSelected: (item: string) => void;
  lengthList?: number;
};

export const Dropdown: React.FC<Props> = ({
  listOptions,
  selected,
  choosSelected,
  lengthList,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  const openMenu = () => {
    setActive(prev => !prev);
  };

  const choose = (item: string) => {
    if (!lengthList) {
      searchParams.set('sort', item);
      setSearchParams(searchParams);
    }

    if (lengthList) {
      searchParams.set('perPage', item);
      setSearchParams(searchParams);
    }

    choosSelected(item);
    setActive(false);
  };

  useEffect(() => {
    if (lengthList) {
      listOptions.forEach((el: string) => {
        if (lengthList < +el) {
          choosSelected(`${lengthList}`);
        }
      });

      if (lengthList > +selected) {
        choosSelected(`${lengthList}`);
      }
    }
  }, [lengthList]);

  return (
    <div className="dropdown">
      <div className="currently-value" onClick={openMenu} onKeyDown={openMenu}>
        {selected}
        <img
          src="./img/icons/Right.png"
          alt="arrow"
          className={classNames('close', {
            open: active,
          })}
        />
      </div>
      <div
        className={classNames('elements', {
          'active-menu': active,
        })}
      >
        {listOptions.map((el) => {
          const isDisable = lengthList ? lengthList < +el : false;

          return (
            <button
              type="button"
              disabled={isDisable}
              onClick={() => choose(el)}
              key={el}
              className={classNames({
                selected: el === selected,
                disable: isDisable,
              })}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
};
