import cn from 'clsx';
import { Button } from '../Button/Button';
import ArrowLeft from '/src/images/icons/arrow-left.svg?react';
import ArrowRight from '/src/images/icons/arrow-right.svg?react';
import type { ComponentPropsWithRef, FC } from 'react';

type Props = ComponentPropsWithRef<'button'>;

export const PrevButton: FC<Props> = props => {
  const { className, ...restProps } = props;

  return (
    <Button
      type="button"
      className={cn(
        'group shadow-icons hover:shadow-primary dark:shadow-d-surface2 dark:bg-d-surface2 dark:hover:shadow-d-icons dark:hover:bg-d-icons disabled:shadow-elements dark:disabled:shadow-d-elements dark:disabled:bg-d-black flex size-8 items-center justify-center shadow-inner transition',
        className,
      )}
      {...restProps}
    >
      <ArrowLeft className="fill-primary dark:fill-d-white group-disabled:fill-icons dark:group-disabled:fill-d-icons size-4" />
    </Button>
  );
};

export const NextButton: FC<Props> = props => {
  const { className, ...restProps } = props;

  return (
    <Button
      type="button"
      className={cn(
        'shadow-icons group hover:shadow-primary disabled:shadow-elements dark:shadow-d-surface2 dark:bg-d-surface2 dark:hover:shadow-d-icons dark:hover:bg-d-icons dark:disabled:shadow-d-elements dark:disabled:bg-d-black flex size-8 items-center justify-center shadow-inner transition',
        className,
      )}
      {...restProps}
    >
      <ArrowRight className="fill-primary dark:fill-d-white group-disabled:fill-icons dark:group-disabled:fill-d-icons size-4" />
    </Button>
  );
};
