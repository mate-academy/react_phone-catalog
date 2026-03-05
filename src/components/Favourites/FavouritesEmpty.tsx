import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import type { FavouritesEmptyProps } from './types/FavouritesEmpty';
import { TYPOGRAPHY } from '@/constants/typography';
import { Trans } from 'react-i18next';
import { cn } from '@/lib/utils';
import { CustomButton } from '../ui/CustomButton';
import { Loader } from '@/components/ui/Loader';
import { useTranslation } from 'react-i18next';

export const FavouritesEmpty = ({
  title = 'favourites.titleEmpty',
  description = 'favourites.description',
  buttonText = 'favourites.buttonText',
  showSuggestions = true,
  isLoading = false,
}: FavouritesEmptyProps) => {
  const { t } = useTranslation();
  return (
    <Loader isLoading={isLoading}>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
          <div className="relative mb-8">
            <Heart
              className="size-32 text-muted-foreground/20 animate-pulse"
              strokeWidth={0.5}
            />
            <Heart
              className="size-12 text-primary absolute bottom-2 right-2 animate-bounce"
              fill="currentColor"
            />
          </div>

          <h2 className={cn(TYPOGRAPHY.h2, 'mb-6')}>{t(title)}</h2>

          <div className="flex flex-col items-center gap-6 mb-10">
            <p className="text-muted-foreground text-lg">{t(description)}</p>

            <div className="inline-flex items-center gap-3 bg-muted px-6 py-4 rounded-2xl border border-dashed border-border">
              <p className="text-sm font-medium text-muted-foreground">
                <Trans i18nKey="favourites.emptyHint">
                  Just click the{' '}
                  <Heart
                    className="inline size-4 text-primary mx-1"
                    fill="currentColor"
                  />{' '}
                  icon on any product to save it here
                </Trans>
              </p>
            </div>
          </div>

          <Link to="/home">
            <CustomButton size="catalog">{t(buttonText)}</CustomButton>
          </Link>
        </div>

        {showSuggestions && <div />}

        <Link
          to="/home"
          className="group mt-8 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {t('favourites.viewAll')}{' '}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Loader>
  );
};
