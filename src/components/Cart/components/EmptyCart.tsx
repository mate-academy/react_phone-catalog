import { Link } from 'react-router-dom';
import { ShoppingCart, MousePointerClick, ArrowRight } from 'lucide-react';
import { Trans } from 'react-i18next';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { CustomButton } from '@/components/ui/CustomButton';
import { Loader } from '@/components/ui/Loader';
import { EMPTY_CART_DEFAULT_CONTENT } from '../constants/emptyCartContent';
import type { EmptyCartProps } from '../types';
import { useTranslation } from 'react-i18next';

export const EmptyCart = ({
  title = EMPTY_CART_DEFAULT_CONTENT.TITLE,
  description = EMPTY_CART_DEFAULT_CONTENT.DESCRIPTION,
  buttonText = EMPTY_CART_DEFAULT_CONTENT.BUTTON,
  isLoading = false,
}: EmptyCartProps) => {
  const { t } = useTranslation();

  const resolvedTitle = t(title);
  const resolvedDescription = t(description);
  const resolvedButtonText = t(buttonText);

  return (
    <Loader isLoading={isLoading}>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
          <div className="relative mb-8">
            <ShoppingCart
              className="size-32 text-muted-foreground/20 animate-pulse"
              strokeWidth={0.5}
            />
            <ShoppingCart
              className="size-12 text-foreground absolute bottom-2 right-2 animate-bounce"
              fill="currentColor"
            />
          </div>

          <h2 className={cn(TYPOGRAPHY.h2, 'mb-6')}>{resolvedTitle}</h2>

          <div className="flex flex-col items-center gap-6 mb-10">
            <p className="text-muted-foreground text-lg">
              {resolvedDescription}
            </p>

            <div className="inline-flex items-center gap-3 bg-muted px-6 py-4 rounded-2xl border border-dashed border-border">
              <MousePointerClick className="size-5 text-blue-500" />
              <p className="text-sm font-medium text-muted-foreground">
                <Trans i18nKey="cart.emptyHint">
                  Click <strong>Add to cart</strong> on any book to get started
                </Trans>
              </p>
            </div>
          </div>

          <Link to="/">
            <CustomButton size="catalog">{resolvedButtonText}</CustomButton>
          </Link>
        </div>

        <Link
          to="/"
          className="group mt-8 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {t('cart.viewAll')}{' '}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Loader>
  );
};
