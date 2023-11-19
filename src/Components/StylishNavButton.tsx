/* eslint-disable max-len */
import classNames from 'classnames';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children?: ReactNode;
  imgUrl?: string;
  to: string;
  disabled?: boolean;
  counter?: number;
};

export const StylishNavButton: React.FC<Props> = ({
  imgUrl,
  to,
  children,
  disabled,
  counter,
}) => {
  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div
        className={classNames('group relative h-16 overflow-hidden', {
          'w-16': imgUrl,
        })}
      >
        {!!counter && (
          <div className="absolute right-[18px] top-[18px] z-10 flex h-[14px] w-[14px] items-center justify-center rounded-full border border-white bg-Red">
            <p className="text-[8px] font-semibold leading-none text-white">
              {counter}
            </p>
          </div>
        )}

        <NavLink
          className={({ isActive }) => {
            return classNames(
              'box relative flex h-16 items-center overflow-hidden transition-all',
              {
                'text-Secondary': !isActive,
                'absolute w-16 justify-center border border-r-0 border-Elements':
                  imgUrl,
                'cursor-not-allowed': disabled,
              },
            );
          }}
          onClick={handleOnClick}
          to={to}
        >
          {({ isActive }) => (
            <>
              {imgUrl ? (
                <img className="h-4 w-4" src={imgUrl} alt="Favourites" />
              ) : (
                children
              )}
              <div
                className={classNames(
                  'absolute bottom-0 h-[3px] w-full bg-Primary transition-all',
                  {
                    'bottom-[-3px] group-hover:bottom-[-1px]':
                      !isActive && !disabled,
                    'bottom-[-3px] cursor-not-allowed group-hover:bottom-[-3px]':
                      disabled,
                  },
                )}
              />
            </>
          )}
        </NavLink>
      </div>
    </>
  );
};
