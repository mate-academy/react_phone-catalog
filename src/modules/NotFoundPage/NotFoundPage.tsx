import { useTranslations } from 'use-intl';
import { GoHomeButton } from '../shared/components/ui/Button/GoHomeButton';
import type { FC } from 'react';

export const NotFoundPage: FC = () => {
  const t = useTranslations('misc');

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 xl:mt-14">
      <img
        src="images/page-not-found.webp"
        alt={t('pageNotFound')}
        width={819}
        height={787}
        className="w-full max-w-1/2 sm:max-w-1/3"
      />
      <h2 className="text-h1 text-primary dark:text-d-white text-center">
        {t('pageNotFound')}
      </h2>
      <GoHomeButton />
    </div>
  );
};
