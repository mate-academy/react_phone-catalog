import React, { useState } from 'react';
import { fallDown as Menu } from 'react-burger-menu';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';

type Props = {
  outerContainerId: string;
  pageWrapId: string;
};

export default (props: Props) => {
  const [menuWidth, setMenuWidth] = useState('30%');

  const onResize = (width: number) => {
    if (width >= 620) {
      setMenuWidth('30%');
    } else if (width < 620) {
      setMenuWidth('50%');
    }
  };

  return (
    <>
      <ReactResizeDetector handleWidth onResize={onResize} />
      <Menu {...props} disableAutoFocus width={menuWidth}>
        <ul>
          <li className="nav__item">
            <Link className="nav__link-side-bar hover-shadow hover-color animated nav__link-mobile" to="/">
              <span>H</span>
              <span>o</span>
              <span>m</span>
              <span>e</span>
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link-side-bar hover-shadow hover-color animated nav__link-mobile" to="/phones">
              <span>P</span>
              <span>h</span>
              <span>o</span>
              <span>n</span>
              <span>e</span>
              <span>s</span>
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link-side-bar hover-shadow hover-color animated nav__link-mobile" to="/tablets">
              <span>T</span>
              <span>a</span>
              <span>b</span>
              <span>l</span>
              <span>e</span>
              <span>t</span>
              <span>s</span>
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link-side-bar hover-shadow hover-color animated nav__link-mobile" to="/accessories">
              <span>A</span>
              <span>c</span>
              <span>c</span>
              <span>e</span>
              <span>s</span>
              <span>s</span>
              <span>o</span>
              <span>r</span>
              <span>i</span>
              <span>e</span>
              <span>s</span>
            </Link>
          </li>
          <li className="nav__item">
            <a className="nav__link-side-bar hover-shadow hover-color animated nav__link-mobile" href="https://github.com/ShapovalDenys?tab=repositories">
              <span>G</span>
              <span>i</span>
              <span>t</span>
              <span>h</span>
              <span>u</span>
              <span>b</span>
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link-side-bar hover-shadow hover-color animated nav__link-mobile" href="https://www.linkedin.com/in/denys-shapoval-831a74143/">
              <span>C</span>
              <span>o</span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>t</span>
              <span>s</span>
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link-side-bar hover-shadow hover-color animated nav__link-mobile" href="https://ru.wikipedia.org/wiki/All_rights_reserved">
              <span>r</span>
              <span>i</span>
              <span>g</span>
              <span>h</span>
              <span>t</span>
              <span>s</span>
            </a>
          </li>
        </ul>
      </Menu>
    </>
  );
};
