/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, Fragment, useContext } from 'react';
import cn from 'classnames';
// import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { NavigationLink } from '../NavigationLink';

const styles = require('./NavMap.module.scss');

const {
  NavMap: navMap,
  NavMap__list: list,
  NavMap__item: listItem,
  'NavMap__item--dark': listItemDark,
} = styles;

type Props = {
  className?: string;
  navItems: string[];
};

export const NavMap: FC<Props> = ({ className = '', navItems }) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        navMap,
        className,
      )}
    >
      <div
        className={list}
      >
        <NavigationLink
          direction="right"
          to="/"
        />

        {navItems.map((item, index) => (
          <Fragment key={item}>
            {index === navItems.length - 1
              ? (
                <span
                  className={cn(
                    listItem,
                    { [listItemDark]: isThemeDark },
                  )}
                >
                  {item}
                </span>
              ) : (
                <NavigationLink
                  to={`/${item.toLowerCase()}`}
                  direction="right"
                >
                  {item}
                </NavigationLink>
              )}
          </Fragment>
        ))}
      </div>

      {navItems.length > 1 && (
        <NavigationLink
          direction="left"
          to="../"
        >
          Back
        </NavigationLink>
      )}
    </div>
  );
};

NavMap.defaultProps = {
  className: '',
};
