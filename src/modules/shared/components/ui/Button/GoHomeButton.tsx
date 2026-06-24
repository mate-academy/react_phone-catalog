import { Link } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import cn from 'clsx';
import { Button } from './Button';
import type { FC } from 'react';

interface Props {
  className?: string;
}

export const GoHomeButton: FC<Props> = ({ className }) => {
  const t = useTranslations('misc');

  return (
    <Button
      as={Link}
      to="/home"
      className={cn(
        'bg-primary dark:bg-d-accent hover:shadow-hover-bs dark:hover:bg-d-hover-bs text-buttons flex h-10 items-center justify-center px-15 text-white transition hover:shadow-[0_3px_13px_0]',
        className,
      )}
    >
      {t('goHome')}
    </Button>
  );
};
