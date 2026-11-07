import type React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ICONS } from '../../../constants/icons';
import { ButtonIcon } from '../../atoms/Buttons/ButtonIcon';
import { HeadLogo } from '../../atoms/Logos/HeadLogo';
import { ThemeToggle } from '../../atoms/ToggleTheme/ToggleTheme';
import { NavigationButtons } from '../../molecules/Navigation/NavigationalButtons';
import { NavigationTopList } from '../../molecules/Navigation/NavigationTopList';
import { SearchBar } from '../../molecules/Navigation/SearchBar';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { SignInModal } from '../SignInModal/SignInModal';
import { useAppState } from '../../../store/store';
import { supabase } from '../../../services/supabase';
import { LogIn, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState<boolean>(false);

  const user = useAppState((state) => state.user);

  const notifySignOut = () => toast.error('You have signed out!');

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!isMenuOpen) {
      html.style.overflow = '';
      body.style.overflow = '';
      return;
    }

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickLink = () => {
    setIsMenuOpen(false);
  };

  const handleClickSignIn = () => {
    setIsSignModalOpen(!isSignModalOpen);
  };

  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
    notifySignOut();
  };

  return (
    <>
      <header
        className={classNames(
          'top-0 z-50 w-full border-b border-elements h-12 lg:h-16 bg-white pl-[16px] lg:pl-[24px] dark:border-surface-2-dark dark:bg-primary',
          {
            fixed: isMenuOpen,
            sticky: !isMenuOpen,
          },
        )}
      >
        <div className="h-full mx-auto flex items-center justify-between">
          <div className="flex shrink-0 items-center gap-[32px] lg:gap-[48px]">
            <HeadLogo onClick={handleClickLink} />
            <div className="hidden md:flex items-center gap-[32px] lg:gap-[64px] dark:text-white">
              <NavigationTopList />
            </div>
          </div>

          <SearchBar />

          <div className="flex items-center h-full">
            <div className="border-l border-b border-elements w-[48px] h-[48px] lg:w-[64px] lg:h-[64px] flex items-center justify-center hover:bg-elements dark:bg-primary dark:hover:bg-icons text-primary dark:text-white transition-colors cursor-pointer">
              {user ?
                <button
                  className="flex justify-center items-center h-full w-full"
                  type="button"
                  onClick={handleSignOut}
                  aria-label="Sign out"
                >
                  <LogOut size={20} />
                </button>
              : <button
                  className="flex justify-center items-center h-full w-full"
                  type="button"
                  onClick={handleClickSignIn}
                  aria-label="Sign in"
                >
                  <LogIn size={20} />
                </button>
              }
            </div>

            <div className="border-l border-b border-elements">
              <ThemeToggle />
            </div>

            <div className="hidden md:flex items-center h-full">
              <NavigationButtons
                classNames="md:w-24 lg:w-[128px]"
                onClick={handleClickLink}
              />
            </div>

            <div className="flex md:hidden items-center h-full group">
              <ButtonIcon
                className="w-[48px] h-full border-b-0 hover:border-none pl-px border-t-0 border-r-0 hover:bg-elements border-l-elements dark:group-hover:bg-icons"
                src={isMenuOpen ? ICONS.CLOSE : ICONS.MENU}
                handleClick={menuToggle}
              />
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && <div className="w-full h-12" />}

      <BurgerMenu
        handleClickLink={handleClickLink}
        isOpen={isMenuOpen}
      />

      <SignInModal
        onCloseModal={handleClickSignIn}
        isOpen={isSignModalOpen}
      />
    </>
  );
};
