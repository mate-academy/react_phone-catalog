import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.tsx';
import { doSingOut } from '@/firebase/auth';
import { cn } from '@/lib/utils';
import { HeaderIconLink } from './HeaderIconLink';
import { HeaderNav } from './HeaderNav';
import { HeaderSearch } from './HeaderSearch';
import { Icon } from '../ui/icons';

type Props = {
  onClose: () => void;
  onSearchClick: () => void;
};

export const BurgerMenu = ({ onClose, onSearchClick }: Props) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col justify-between h-full w-full">
        <div
          className={cn(
            'mx-auto flex items-center justify-between pl-4 w-full max-w-[1280px]',
            'h-[48px] border-b bg-secondary',
          )}
        >
          <Link
            to="/"
            className="flex mr-4 transition-transform hover:scale-105"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/Logo.svg`}
              alt="Codex logo"
              className="w-22.25 h-8"
            />
          </Link>
          <button
            onClick={onClose}
            className="w-[48px] h-[48px] flex items-center justify-center"
          >
            <Icon
              name="close"
              className="w-4 h-4 text-white"
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col py-8 gap-6 bg-secondary">
          <HeaderNav
            isMobile
            onLinkClick={onClose}
          />

          <div className="flex flex-col gap-4 px-4">
            <HeaderSearch
              isMobile
              onCategorySelect={onClose}
              onClick={onSearchClick}
            />
          </div>
        </div>

        <div className="flex border-t h-[56px]">
          <HeaderIconLink
            to="/favourites"
            onClick={onClose}
            className="flex-1"
          >
            <Icon
              name="heart"
              className="w-4 h-4"
            />
          </HeaderIconLink>

          <HeaderIconLink
            to="/cart"
            onClick={onClose}
            className="flex-1"
          >
            <Icon
              name="shoppingBag"
              className="w-4 h-4"
            />
          </HeaderIconLink>
          {userLoggedIn ?
            <>
              <HeaderIconLink
                to="/profile"
                state={{ background: location }}
                className="flex-1"
              >
                <Icon
                  name="profileIcon"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
              <HeaderIconLink
                className="flex-1"
                onClick={() => {
                  doSingOut().then(() => {
                    navigate('/login', { replace: true });
                  });
                }}
              >
                <Icon
                  name="signOut"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
            </>
          : <>
              <HeaderIconLink
                to="/login"
                className="flex-1"
              >
                <Icon
                  name="signIn"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
              <HeaderIconLink
                to="/signup"
                className="flex-1"
              >
                <Icon
                  name="signUp"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
            </>
          }
        </div>
      </div>
    </div>
  );
};
