/* eslint-disable max-len */
import classNames from 'classnames';
import { ReactNode } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

type Props = {
  children?: ReactNode;
  imgUrl?: string;
  to: string;
};

export const StylishNavButton: React.FC<Props> = ({ imgUrl, to, children }) => {
  const location = useMatch(to);

  return (
    <div
      className={classNames('group relative h-16 overflow-hidden', {
        'w-16': imgUrl,
      })}
    >
      <NavLink
        className={({ isActive }) => {
          return classNames('flex h-16 items-center transition-all', {
            'text-Secondary': !isActive,
            'absolute w-16 justify-center border border-Elements border-r-[white] hover:border-Primary':
              imgUrl,
          });
        }}
        to={to}
      >
        {imgUrl ? (
          <img className="h-4 w-4" src={imgUrl} alt="Favourites" />
        ) : (
          children
        )}
      </NavLink>
      <div
        className={classNames(
          'absolute bottom-0 h-[3px] w-full bg-Primary transition-all',
          {
            'bottom-[-3px] bg-Secondary group-hover:bottom-[-1px]':
              !location?.pattern.path,
          },
        )}
      />
    </div>
  );
};
