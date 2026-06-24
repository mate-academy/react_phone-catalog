import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import ArrowLeft from '/src/images/icons/arrow-left.svg?react';
import { FC } from 'react';
import cn from 'clsx';
import { useTranslations } from 'use-intl';

type Props = {
  className?: string;
};

export const BackButton: FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const t = useTranslations('misc');

  return (
    <Button
      onClick={() => navigate(-1)}
      className={cn('group flex items-center justify-center gap-1', className)}
    >
      <ArrowLeft className="fill-primary dark:fill-d-white dark:group-hover:fill-d-accent size-4" />
      <span className="text-small text-secondary dark:text-d-white dark:group-hover:text-d-accent group-hover:text-primary transition">
        {t('back')}
      </span>
    </Button>
  );
};
