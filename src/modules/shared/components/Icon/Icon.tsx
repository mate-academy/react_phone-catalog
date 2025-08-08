import React, { useCallback } from 'react';
import iconStyle from './Icon.module.scss';
import { NavLink, NavLinkRenderProps, useLocation } from 'react-router-dom';
import { NavVariants } from '../../../../types/NavVariants';
import cn from 'classnames';
import { IconEnum } from '../../../../types/iconsType';

type IconProps = {
  iconName: IconEnum;
  href?: string;
  variant?: NavVariants;
  count?: number;
  onActive?: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
};

export const Icon: React.FC<IconProps> = React.memo(
  ({
    iconName,
    href = '',
    variant = NavVariants.default,
    count = false,
    onActive = () => {},
  }) => {
    const location = useLocation();
    const getActive = () => onActive((current: boolean) => !current);
    const getPath = useCallback(
      (icon: string): string => {
        if (
          icon === IconEnum.burger ||
          icon === IconEnum.close ||
          icon === IconEnum.arrow
        ) {
          return location.pathname;
        }

        return href;
      },
      [href, location.pathname],
    );

    const getNavLinkClass = useCallback(
      (isActive: NavLinkRenderProps) =>
        cn(
          [
            iconStyle.icon,
            iconStyle['icon--top-bar'],
            iconStyle[`icon--${iconName}`],
          ],
          {
            [iconStyle[`icon--${variant}`]]: !!variant,
            [iconStyle[`icon--active`]]: !isActive,
          },
        ),
      [iconName, variant],
    );

    return (
      <NavLink
        to={getPath(iconName)}
        className={isActive => getNavLinkClass(isActive)}
        onClick={getActive}
        aria-label={iconName}
      >
        {Boolean(count) && (
          <p
            className={cn(iconStyle.icon__counter, {
              [iconStyle['icon__counter--menu']]: variant === NavVariants.menu,
            })}
          >
            {count}
          </p>
        )}
      </NavLink>
    );
  },
);

Icon.displayName = 'Icon';
