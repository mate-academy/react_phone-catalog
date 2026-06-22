'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/entities/Cart';
import { useFavoritesStore } from '@/entities/Favorite';
import type { Product } from '@/entities/Product';
import { getClientProducts } from '@/entities/Product/api/getClientProducts';
import { BASE_URL } from '@/shared/constants/constant';
import { useTranslation } from '@/shared/hooks';
import { useCounterAnimation } from '@/shared/hooks/useCounterAnimation';
import { cn } from '@/shared/lib/utils';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/shared/ui/Icons';
import { Logo } from '@/shared/ui/Logo';
import { ProfileDropdown } from '@/shared/ui/ProfileDropdown';
import { MobileMenu } from '@/widgets/Header/MobileMenu';
import { DesktopNavLinks } from '@/widgets/Header/NavLinks';

export const Header = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    getClientProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = debouncedSearch.trim()
    ? allProducts
        .filter((product) =>
          product.name
            .toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearch('');
  };

  const cartItems = useCartStore((state) => state.items);
  const favoriteItems = useFavoritesStore((state) => state.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const formatCount = (count: number) => (count > 99 ? '99+' : count);
  const favoriteCount = favoriteItems.length;

  const isCartAnimating = useCounterAnimation(cartCount);
  const isFavoriteAnimating = useCounterAnimation(favoriteCount);

  return (
    <header className="fixed top-0 left-0 right-0 z-1100 border-b border-brand-elements bg-brand-black">
      <div className="flex h-11.75 items-center justify-between lg:h-16">
        <div className="flex h-full items-center">
          <div className="flex h-full items-center px-4 md:px-6 lg:px-8">
            <Logo />
          </div>
          <nav
            className={cn(
              'hidden h-full md:flex',
              isSearchOpen && 'md:hidden lg:flex',
            )}
          >
            <DesktopNavLinks pathname={pathname} />
          </nav>
        </div>

        <div className="flex h-full items-center">
          {isSearchOpen ? (
            <div className="relative flex items-center gap-2 px-4">
              <input
                autoFocus
                type="text"
                placeholder={t('searchHere')}
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value.trimStart().replaceAll('  ', ' '),
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && search.trim()) {
                    router.push(
                      `/search?query=${encodeURIComponent(search.trim())}`,
                    );
                    closeSearch();
                  }
                }}
                className="h-9 pl-4 pr-8 rounded-full bg-brand-surface-2 text-brand-white text-sm outline-none w-full max-w-64 max-[480px]:max-w-40"
                onBlur={() => setTimeout(() => closeSearch(), 150)}
              />

              {search && (
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setSearch('');
                  }}
                  className="absolute right-6 text-brand-secondary hover:text-brand-white"
                  aria-label={t('clearSearch')}
                >
                  <CloseIcon className="size-4" />
                </button>
              )}

              {filteredProducts.length > 0 && (
                <div className="absolute top-12 left-4 right-4 sm:left-4 sm:right-auto sm:w-64 bg-brand-surface-2 rounded-lg shadow-lg overflow-hidden">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.itemId}
                      href={`/${product.category}/${product.itemId}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-brand-white hover:bg-brand-elements"
                    >
                      <Image
                        src={`${BASE_URL}/${product.image}`}
                        alt={product.name}
                        width={32}
                        height={32}
                        className="object-contain shrink-0"
                      />
                      <span className="text-sm line-clamp-2 max-[430px]:text-xs">
                        {product.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label={t('search')}
              className="flex h-full w-16 items-center justify-center border-l border-brand-elements text-brand-white transition-colors hover:bg-brand-surface-1 lg:w-22 cursor-pointer"
            >
              <SearchIcon className="size-4" />
            </button>
          )}

          <Link
            href="/favorites"
            aria-label={t('favorites')}
            className="hidden h-full w-16 items-center justify-center border-l border-brand-elements text-brand-white transition-colors hover:bg-brand-surface-1 md:flex lg:w-22 relative"
          >
            <div className="relative">
              <HeartIcon className="size-4 shrink-0" />
              {favoriteCount > 0 && (
                <span
                  className={cn(
                    'absolute -top-1.25 -right-1.75 flex size-3.75 items-center justify-center rounded-full bg-brand-red border-2 border-solid text-[8px] font-bold text-white leading-1 transition-colors duration-300',
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
            aria-label={t('cart')}
            className="hidden h-full w-16 items-center justify-center border-l border-brand-elements text-brand-white transition-colors hover:bg-brand-surface-1 md:flex lg:w-22 relative"
          >
            <div className="relative">
              <CartIcon className="size-4 shrink-0" />
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

          <ProfileDropdown className="flex" />

          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
};
