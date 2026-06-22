'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/entities/Cart';
import { useFavoritesStore } from '@/entities/Favorite';
import { useCounterAnimation } from '@/shared/hooks/useCounterAnimation';
import { cn } from '@/shared/lib/utils';
import { CartIcon, CloseIcon, HeartIcon, MenuIcon } from '@/shared/ui/Icons';
import { Logo } from '@/shared/ui/Logo';
import { MobileNavLinks } from '@/widgets/Header/NavLinks';

const mobileIconButtonClassName =
  'flex h-12 w-12 items-center justify-center border-l border-brand-elements text-brand-white transition-colors hover:bg-brand-surface-1';

export const MobileMenu = ({ pathname }: { pathname: string | null }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleTransitionEnd = () => {
    if (!open) setVisible(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const cartItems = useCartStore((state) => state.items);
  const favoriteItems = useFavoritesStore((state) => state.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const formatCount = (count: number) => (count > 99 ? '99+' : count);
  const favoriteCount = favoriteItems.length;

  const isCartAnimating = useCounterAnimation(cartCount);
  const isFavoriteAnimating = useCounterAnimation(favoriteCount);

  if (!visible && !open) {
    return (
      <button
        className={cn(mobileIconButtonClassName, 'md:hidden')}
        onClick={openMenu}
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-1100">
      <button
        className={cn(mobileIconButtonClassName, 'md:hidden')}
        onClick={openMenu}
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      <div className="fixed inset-0 z-1100 md:hidden">
        <div
          className="absolute inset-0 bg-brand-black/60 transition-opacity duration-300 ease-in-out"
          style={{ opacity: open ? 1 : 0 }}
          onClick={closeMenu}
        />

        <div
          className="absolute inset-y-0 right-0 flex w-full sm:max-w-xs flex-col bg-brand-black transition-transform duration-300 ease-in-out"
          style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="flex h-12 items-center justify-between border-b border-brand-elements">
            <div className="flex h-full items-center px-4">
              <Logo />
            </div>
            <button
              className="flex h-12 w-12 items-center justify-center border-l border-brand-elements text-brand-white transition-colors hover:bg-brand-surface-1"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center gap-8 pt-16">
            <MobileNavLinks pathname={pathname} onClose={closeMenu} />
          </nav>

          <div className="grid h-16 grid-cols-2 border-t border-brand-elements">
            <Link
              href="/favorites"
              onClick={closeMenu}
              className={cn(
                'relative flex h-full items-center justify-center border-r border-brand-elements text-brand-white transition-colors hover:bg-brand-surface-1',
              )}
            >
              <div className="relative">
                <HeartIcon className="size-4" />
                {favoriteCount > 0 && (
                  <span
                    className={cn(
                      'absolute -top-1.25 -right-1.75 flex size-3.75 items-center justify-center rounded-full bg-brand-red border-2 border-solid text-[8px] font-bold text-white leading-none transition-colors duration-300',
                      isFavoriteAnimating
                        ? 'border-brand-white'
                        : 'border-brand-black',
                    )}
                  >
                    {formatCount(favoriteCount)}
                  </span>
                )}
              </div>
              {pathname?.startsWith('/favorites') && (
                <span className="absolute bottom-0 h-0.75 w-full bg-brand-white" />
              )}
            </Link>

            <Link
              href="/cart"
              onClick={closeMenu}
              className={cn(
                'relative flex h-full items-center justify-center text-brand-white transition-colors hover:bg-brand-surface-1',
              )}
            >
              <div className="relative">
                <CartIcon className="size-4" />
                {cartCount > 0 && (
                  <span
                    className={cn(
                      'absolute -top-1.25 -right-1.75 flex size-3.75 items-center justify-center rounded-full bg-brand-red border-2 border-solid text-[8px] font-bold text-white leading-none transition-colors duration-300',
                      isCartAnimating
                        ? 'border-brand-white'
                        : 'border-brand-black',
                    )}
                  >
                    {formatCount(cartCount)}
                  </span>
                )}
              </div>
              {pathname?.startsWith('/cart') && (
                <span className="absolute bottom-0 h-0.75 w-full bg-brand-white" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
