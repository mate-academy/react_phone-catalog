import { Button } from './Button';
import ArrowUp from '/src/images/icons/arrow-up.svg?react';
import type { FC } from 'react';
import cn from 'clsx';
import { useTranslations } from 'use-intl';

interface Props {
  className?: string;
}

export const BackToTopButton: FC<Props> = ({ className }) => {
  const t = useTranslations('misc');

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      className={cn('group flex items-center gap-4', className)}
    >
      <span className="text-small text-secondary dark:text-d-secondary group-hover:text-primary dark:group-hover:text-d-white transition">
        {t('backToTop')}
      </span>
      <Button
        as="div"
        className="shadow-elements dark:bg-d-surface2 dark:shadow-d-surface2 group-hover:shadow-primary dark:group-hover:bg-d-icons dark:group-hover:shadow-d-icons flex size-8 items-center justify-center p-2 shadow-inner transition"
      >
        <ArrowUp className="fill-primary dark:fill-d-white" />
      </Button>
    </Button>
  );
};
