import type React from 'react';
import { ICONS } from '../../../constants/icons';
import { ButtonIcon } from '../../atoms/Buttons/ButtonIcon';
import CN from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppState } from '../../../store/store';
import { IconNotification } from '../IconNotification/IconNotification';
import { useRef } from 'react';

type Props = {
  onClick: () => void;
  classNames?: string;
};

const variant = {
  default:
    'group relative w-[50%] h-[48px] lg:w-[64px] lg:h-[64px] flex items-center justify-center md:border-l border-elements dark:border-surface-2-dark hover:bg-elements transition-colors dark:hover:bg-icons',
};

export const NavigationButtons: React.FC<Props> = ({ onClick, classNames }) => {
  const hasFavourites = useAppState((state) => state.favourites.size);
  const hasCartItems = useAppState((state) =>
    [...state.cart.values()].reduce(
      (count, item) => item.amountAdded + count,
      0,
    ),
  );

  const cartRef = useRef<HTMLAnchorElement>(null);

  return (
    <nav className={CN('flex items-center', classNames)}>
      <NavLink
        to="/favourites"
        className={variant.default}
        onClick={onClick}
      >
        {({ isActive }) => (
          <>
            {hasFavourites ?
              <IconNotification
                src={ICONS.HEART_EMPTY}
                notification={hasFavourites}
              />
            : <ButtonIcon
                className="border-none cursor-pointer dark:bg-primary dark:group-hover:bg-icons transition-colors"
                src={ICONS.HEART_EMPTY}
                handleClick={onClick}
              />
            }

            {isActive && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full bg-primary dark:bg-white" />
            )}
          </>
        )}
      </NavLink>
      <NavLink
        ref={cartRef}
        data-cart-target="true"
        to="/bag"
        className={`${variant.default} border-l`}
        onClick={onClick}
      >
        {({ isActive }) => (
          <>
            {hasCartItems ?
              <IconNotification
                src={ICONS.BAG}
                notification={hasCartItems}
              />
            : <ButtonIcon
                className="border-none cursor-pointer"
                src={ICONS.BAG}
                handleClick={onClick}
              />
            }

            {isActive && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full bg-primary dark:bg-white" />
            )}
          </>
        )}
      </NavLink>
    </nav>
  );
};
