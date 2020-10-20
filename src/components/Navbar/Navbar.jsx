import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import classNames from 'classnames';
const nav = ["home", 'phones', "tablets", "accessories"];

function Navbar({  }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
        <ul className={classNames({
          nav__list: true,
          nav__list_header: true,
          nav__list_burger: open
        })}
        >
          {nav.map((el, index) => {
            return (
              <li className="nav__item nav__item_header" key={el}>
                <a href={`#${el}`}
                  className={classNames({
                    nav__link: true,
                    nav__link_header: true,
                    nav__link_isActive: active === index,
                    nav__link_burger: open,
                  })}
                  onClick={() => {setActive(index); setOpen(false) }}
                >
                  {el}
                </a>
              </li>
            );
          })}
        </ul>
      <div className="burger" 
        onClick={() => {
          setOpen(!open);
        }}
        >
        <div className={classNames({
          burger__item: true,
          burger__item_first: open,
        })}
        />
        <div className={classNames({
          burger__item: true,
          burger__item_second: open,
        })}
        />
        <div className={classNames({
          burger__item: true,
          burger__item_third: open,
        })}
        />
      </div>
    </>
  );
}

export default Navbar;
