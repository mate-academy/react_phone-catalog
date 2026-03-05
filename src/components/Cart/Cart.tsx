import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { useCartFavorites } from '@/context/CartFavoritesContext.tsx';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { CartItem } from './components/CartItem';
import { CartItemSkeleton } from './components/CartItemSkeleton';
import { CartSummary } from './components/CartSummary';
import { CartSummarySkeleton } from './components/CartSummarySkeleton';
import { EmptyCart } from './components/EmptyCart';
import { useSimulatedLoading } from './hooks/useSimulatedLoading';
import { calculateCartTotalPrice } from './helpers/calculateCartTotalPrice';
import { calculateCartTotalQuantity } from './helpers/calculateCartTotalQuantity';
import { isSameOriginReferrer } from './helpers/isSameOriginReferrer';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { DISCOUNT_PERCENTAGE } from '@/components/RegisterPromo/types/promo-constants';

export const Cart = () => {
  const { cart } = useCartFavorites();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoading = useSimulatedLoading();
  const { currency, rate } = useCurrency();
  const { userData } = useAuth();

  const discountPercent = userData?.discount ? DISCOUNT_PERCENTAGE : undefined;

  const totalPrice = useMemo(
    () => calculateCartTotalPrice(cart, currency, rate),
    [cart, currency, rate],
  );
  const totalQuantity = useMemo(() => calculateCartTotalQuantity(cart), [cart]);
  const symbol = currency === 'USD' ? '$' : '₴';

  const skeletonCount = cart.length;
  const itemLabel = (count: number) => t('items.count', { count });

  const handleNavigateBack = () => {
    if (isSameOriginReferrer()) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto w-full max-w-[1280px] p-4 md:p-8">
      <button
        onClick={handleNavigateBack}
        className={cn(
          TYPOGRAPHY.small,
          'mb-2 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
        )}
      >
        <ChevronLeft className="size-4" />
        {t('ui.back')}
      </button>

      <h1 className={cn(TYPOGRAPHY.h1, 'mb-2 text-foreground')}>
        {t('cart.cart')}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {isLoading ? itemLabel(skeletonCount) : itemLabel(totalQuantity)}
      </p>

      {cart.length === 0 && <EmptyCart isLoading={isLoading} />}

      {(isLoading ? skeletonCount > 0 : cart.length > 0) && (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 lg:justify-center">
          <div className="flex flex-col gap-4 flex-1 min-w-75 lg:max-w-188">
            {isLoading ?
              Array.from({ length: skeletonCount }, (_, index) => (
                <CartItemSkeleton key={index} />
              ))
            : cart.map((book) => (
                <CartItem
                  key={book.slug}
                  book={book}
                />
              ))
            }
          </div>

          {isLoading ?
            <CartSummarySkeleton />
          : <CartSummary
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              symbol={symbol}
              discountPercent={discountPercent}
            />
          }
        </div>
      )}
    </div>
  );
};
