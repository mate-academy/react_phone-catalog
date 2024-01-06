/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './ButtonLink.scss';

type DynamicClass = 'big' | 'shadow' | 'no-border' | 'link-active' | '';
type Shape = 'cart' | 'cart-big' | 'heart' | 'favourite-big' | 'home' | 'left' | 'right' | 'num';

type Props = {
  dynamicClasses?: DynamicClass[];
  shape: Shape;
  path: { search: string } | string;
  text?: string;
  nav?: boolean;
  disable?: boolean;
};

export const ButtonLink: React.FC<Props> = ({
  dynamicClasses,
  path,
  shape,
  text,
  nav,
  disable,
}) => {
  const getLinkNavClass = ({ isActive }: { isActive: boolean }) => (
    classNames('buttonLink__link', {
      'is-active': isActive && nav,
    }));

  const DC = dynamicClasses?.map(cl => `buttonLink--${cl}`).join(' ');

  return (
    <button
      type="button"
      aria-label="button"
      disabled={disable}
      className={classNames(
        'buttonLink', DC, {
          'buttonLink--disactive': disable,
        },
      )}
    >
      <NavLink
        to={path}
        aria-disabled={disable}
        className={getLinkNavClass}
      >
        <div className={classNames('buttonLink__icon', `buttonLink__icon--${shape}`, {
          'buttonLink__icon--disactive': disable,
        })}
        >
          {text && (
            <p className={classNames('buttonLink__text')}>
              {text}
            </p>
          )}
        </div>
      </NavLink>
    </button>
  );
};
