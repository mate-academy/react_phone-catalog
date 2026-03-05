import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { ProductCard } from '../ProductCard';
import { FavouritesEmpty } from './FavouritesEmpty';
import { useTranslation } from 'react-i18next';
import { useCartFavorites } from '@/context/CartFavoritesContext';

export const Favourites = () => {
  const navigate = useNavigate();
  const { favorites } = useCartFavorites();
  const booksCount: number = favorites.length;
  const isEmptyBooks: boolean = booksCount === 0;
  const { t } = useTranslation();

  return (
    <div className="container mx-auto w-full max-w-[1280px] p-4 md:p-8">
      <button
        onClick={() => {
          if (
            document.referrer &&
            new URL(document.referrer).origin === window.location.origin
          ) {
            navigate(-1);
          } else {
            navigate('/');
          }
        }}
        className={cn(
          TYPOGRAPHY.small,
          'mb-2 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
        )}
      >
        <ChevronLeft className="size-4" />
        {t('ui.back')}
      </button>

      <h1 className={cn(TYPOGRAPHY.h1, 'mb-2 text-foreground')}>
        {t('favourites.title')}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {t('items.count', { count: booksCount })}
      </p>

      {isEmptyBooks ?
        <FavouritesEmpty />
      : <div className="grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1200px)]:grid-cols-4 gap-4 justify-items-center">
          {favorites.map((item) => (
            <ProductCard
              key={item.id}
              book={item}
            />
          ))}
        </div>
      }
    </div>
  );
};
