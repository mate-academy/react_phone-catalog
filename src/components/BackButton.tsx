import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import ArrowLeft from '/src/assets/icons/arrow-left.svg?react';
import { FC } from 'react';
import cn from 'clsx';

type Props = {
  className?: string;
};

export const BackButton: FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      className={cn('flex cursor-pointer items-center gap-1', className)}
    >
      <ArrowLeft className="size-4 fill-primary" />
      <span className="text-small text-secondary">Back</span>
    </Button>
  );
};
