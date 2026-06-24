import { useTranslations } from 'use-intl';
import { Button } from './ui/Button/Button';
import type { FC } from 'react';

interface Props {
  onRetry: () => void;
}

export const ErrorMessage: FC<Props> = ({ onRetry }) => {
  const t = useTranslations('misc');

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 xl:mt-14">
      <img
        src="images/product-not-found.webp"
        alt={t('error')}
        width={819}
        height={787}
        className="w-full max-w-1/2 sm:max-w-1/3"
      />
      <h2 className="text-h1 text-primary dark:text-d-white text-center">
        {t('error')}
      </h2>
      <Button
        onClick={onRetry}
        className="bg-primary dark:bg-d-accent hover:shadow-hover-bs dark:hover:bg-d-hover-bs text-buttons h-10 px-15 text-white transition hover:shadow-[0_3px_13px_0]"
      >
        {t('reload')}
      </Button>
    </div>
  );
};
