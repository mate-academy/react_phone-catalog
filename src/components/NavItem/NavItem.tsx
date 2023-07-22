/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { makeUrl } from '../../helpers/makeUrl';
import { setUrl } from '../../helpers/setUrl';

type Props = {
  item: string,
  isDesktop?: boolean,
  defaultLiClass: string,
  defaultLinkClass: string,
  mobileClass?: string,
  desktopClass?: string,
  onClick?: () => void,
};

export const NavItem: React.FC<Props> = ({
  item,
  isDesktop = false,
  defaultLiClass,
  defaultLinkClass,
  mobileClass = '',
  desktopClass = '',
  onClick = () => {},
}) => {
  return (
    <li
      className={classNames(
        defaultLiClass,
        {
          [mobileClass]: !isDesktop,
          [desktopClass]: isDesktop,
        },
      )}
    >
      {(
        item.includes('logo')
        || item.includes('burger')
        || item.includes('instagram')
        || item.includes('tikTok')
        || item.includes('pinterest')
        || item.includes('close'))
        ? (
          <NavLink
            to={setUrl(item)}
            className="icon"
            onClick={onClick}
          >
            <div className={`icon__image ${item}`} />
          </NavLink>
        ) : (
          <NavLink
            to={makeUrl(item)}
            className={classNames(
              defaultLinkClass,
              {
                [mobileClass]: !isDesktop,
                [desktopClass]: isDesktop,
              },
            )}
          >
            {item}
          </NavLink>
        )}
    </li>
  );
};
