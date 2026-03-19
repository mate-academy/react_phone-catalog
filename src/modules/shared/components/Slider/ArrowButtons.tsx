import cn from 'clsx';
import { Button } from '../ui/Button/Button';
import ArrowLeft from '/src/images/icons/arrow-left.svg?react';
import ArrowRight from '/src/images/icons/arrow-right.svg?react';
import type { ComponentPropsWithRef, FC } from 'react';

type Props = ComponentPropsWithRef<'button'>;

export const PrevButton: FC<Props> = props => {
  const { disabled, className, ...restProps } = props;

  return (
    <Button
      type="button"
      disabled={disabled}
      className={cn(
        'shadow-icons dark:shadow-d-surface2 dark:bg-d-surface2 dark:hover:shadow-d-icons dark:hover:bg-d-icons hover:shadow-primary disabled:shadow-elements dark:disabled:shadow-d-elements dark:disabled:bg-d-black p-2 shadow-inner transition',
        className,
      )}
      {...restProps}
    >
      <ArrowLeft
        className={cn(
          'size-4',
          disabled
            ? 'fill-icons dark:fill-d-icons'
            : 'fill-primary dark:fill-d-white',
        )}
      />
    </Button>
  );
};

export const NextButton: FC<Props> = props => {
  const { disabled, className, ...restProps } = props;

  return (
    <Button
      type="button"
      disabled={disabled}
      className={cn(
        'shadow-icons dark:shadow-d-surface2 dark:bg-d-surface2 dark:hover:shadow-d-icons dark:hover:bg-d-icons hover:shadow-primary disabled:shadow-elements dark:disabled:shadow-d-elements dark:disabled:bg-d-black p-2 shadow-inner transition',
        className,
      )}
      {...restProps}
    >
      <ArrowRight
        className={cn(
          'size-4',
          disabled
            ? 'fill-icons dark:fill-d-icons'
            : 'fill-primary dark:fill-d-white',
        )}
      />
    </Button>
  );
};
