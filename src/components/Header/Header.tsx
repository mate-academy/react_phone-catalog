import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BurgerMenu } from './BurgerMenu';
import { GlobalSearch } from './GlobalSearch/GlobalSearch';
import { HeaderNav } from './HeaderNav';
import { HeaderSearch } from './HeaderSearch';
import { HeaderToolBar } from './HeaderToolBar';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 639) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-secondary border-b border-border min-w-[320px]">
        <div
          className={cn(
            'mx-auto flex items-center justify-between pl-4 transition-all',
            'h-[48px]',
            'lg:h-[64px]',
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

          <HeaderNav />

          <div className="flex items-center h-full">
            <HeaderSearch onClick={() => setIsSearchOpen(true)} />
            <HeaderToolBar
              onMenuClick={() => setIsMenuOpen(true)}
              onSearchIconClick={() => {
                setIsSearchOpen(true);
              }}
            />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <BurgerMenu
          onClose={() => setIsMenuOpen(false)}
          onSearchClick={() => {
            setIsSearchOpen(true);
            setIsMenuOpen(false);
          }}
        />
      )}

      <GlobalSearch
        open={isSearchOpen}
        setOpen={setIsSearchOpen}
        onSelect={() => setIsSearchOpen(false)}
      />
    </>
  );
};
