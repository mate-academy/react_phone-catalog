/* eslint-disable max-len */
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children?: ReactNode;
  to: string;
};

export const StylishNavLink: React.FC<Props> = ({ children, to }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="group relative overflow-hidden">
      <NavLink
        className={({ isActive }) => {
          setIsHidden(isActive);

          return classNames('flex h-16 items-center transition-all', {
            'text-Primary': isActive,
          });
        }}
        to={to}
      >
        {children}
      </NavLink>
      <div
        className={classNames(
          'absolute bottom-0 h-[3px] w-full bg-Primary transition-all',
          {
            'bottom-[-3px]': isHidden,
            'bg-Secondary group-hover:bottom-0': isHidden,
          },
        )}
      />
    </div>
  );
};
