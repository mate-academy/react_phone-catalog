import React from 'react';
import cn from 'classnames';
import iconButtonStyle from './iconButton.module.scss';
import { IconEnum } from '../../../../types/iconsType';

type Prop = {
  iconName?: IconEnum;
  isActive?: boolean;
  isDisabled?: boolean;
  filling?: number | string;
  variable?: string;
};

export const IconButton: React.FC<Prop> = React.memo(
  ({
    iconName = null,
    isDisabled = false,
    isActive = false,
    filling = null,
    variable = '',
  }) => {
    const favActive = iconName === IconEnum.favorites && isActive;
    // const iconDisabled = iconName && isDisabled;
    const fillingActive = filling && !iconName && isActive;
    const fillingDisabled = filling && !iconName && isDisabled;

    return (
      <div
        className={cn(iconButtonStyle['icon-button'], {
          [iconButtonStyle['icon-button--filling']]: filling,
          [iconButtonStyle['icon-button--filling-active']]: fillingActive,
          [iconButtonStyle['icon-button--filling-disabled']]: fillingDisabled,
          [iconButtonStyle['icon-button--disabled']]: isDisabled,
        })}
      >
        {iconName && (
          <div
            className={cn(
              iconButtonStyle['icon-button__icon'],
              iconButtonStyle[`icon-button__icon--${iconName}`],
              {
                [iconButtonStyle[`icon-button__icon--fav-active`]]: favActive,
              },
            )}
          ></div>
        )}
        {!iconName && filling && (
          <div
            className={cn(iconButtonStyle['icon-button__filling'], {
              [iconButtonStyle[`icon-button__filling--${variable}`]]: variable,
            })}
          >
            {filling}
          </div>
        )}
      </div>
    );
  },
);

IconButton.displayName = 'IconButton';
