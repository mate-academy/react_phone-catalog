import { useNavigate } from 'react-router-dom';
import { useBooks } from '@/context/BooksContext';
import { doSingOut } from '@/firebase/auth';
import { BookmarkToggle } from './BookmarkToggle';
import { HeaderIconLink } from './HeaderIconLink';
import { Icon } from '../ui/icons';
import { useAuth } from '@/context/AuthContext.tsx';
import { CountIndicator } from '../ui/CountIndicator';
import { calculateCartTotalQuantity } from '../Cart/helpers/calculateCartTotalQuantity';
import { useCartFavorites } from '@/context/CartFavoritesContext';

type Props = {
  onMenuClick: () => void;
  onSearchIconClick: () => void;
};

export const HeaderToolBar = ({ onMenuClick, onSearchIconClick }: Props) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cartIconRef, favIconRef } = useBooks();
  const { cart, favorites } = useCartFavorites();

  const cartCount = calculateCartTotalQuantity(cart);
  const favCount = favorites.length;

  return (
    <>
      <div className="hidden sm:flex items-center h-full">
        <button
          onClick={onSearchIconClick}
          className="lg:hidden flex items-center justify-center h-[48px] w-[48px]"
          aria-label="Search"
        >
          <Icon
            name="search"
            className="w-4 h-4 text-input hover:text-popover"
          />
        </button>

        <HeaderIconLink
          to="/favourites"
          className="w-[64px] h-full border-1 -ml-px relative"
        >
          <div
            ref={favIconRef}
            className="relative"
          >
            <Icon
              name="heart"
              className="w-4 h-4 text-input hover:text-popover"
            />
            <CountIndicator count={favCount} />
          </div>
        </HeaderIconLink>

        <HeaderIconLink
          to="/cart"
          className="w-[64px] h-full border-1 -ml-px"
        >
          <div
            ref={cartIconRef}
            className="relative"
          >
            <Icon
              name="shoppingBag"
              className="w-4 h-4 text-input hover:text-popover"
            />
            <CountIndicator count={cartCount} />
          </div>
        </HeaderIconLink>
        <div className="relative h-full w-fit flex items-center bg-secondary">
          {userLoggedIn ?
            <>
              <HeaderIconLink
                to="/profile"
                className="w-[64px] h-full border-1 -ml-px"
              >
                <Icon
                  name="profileIcon"
                  className="w-4 h-4 text-input hover:text-popover"
                />
              </HeaderIconLink>
              <HeaderIconLink
                className="w-[64px] h-full border-1 -ml-px"
                onClick={() => {
                  doSingOut().then(() => {
                    navigate('/login', { replace: true });
                  });
                }}
              >
                <Icon
                  name="signOut"
                  className="w-4 h-4 text-input hover:text-popover"
                />
              </HeaderIconLink>
            </>
          : <>
              <HeaderIconLink
                to="/login"
                className="w-[64px] h-full border-1 -ml-px"
              >
                <Icon
                  name="signIn"
                  className="w-4 h-4 text-input hover:text-popover"
                />
              </HeaderIconLink>
              <HeaderIconLink
                to="/signup"
                className="w-[64px] h-full border-1 -ml-px"
              >
                <Icon
                  name="signUp"
                  className="w-4 h-4 text-accent hover:text-popover"
                />
              </HeaderIconLink>
            </>
          }
          <BookmarkToggle />
        </div>
      </div>

      <button
        onClick={onMenuClick}
        className="sm:hidden w-[48px] h-[48px] flex items-center justify-center border-l border-border relative bg-secondary isolate"
        aria-label="Menu"
      >
        <Icon
          name="menu"
          className="w-4 h-4 text-input hover:text-popover"
        />
      </button>
      <div className="sm:hidden flex items-center h-full">
        <BookmarkToggle isMobile />
      </div>
    </>
  );
};
