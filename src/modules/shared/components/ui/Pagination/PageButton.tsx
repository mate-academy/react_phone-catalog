import cn from 'clsx';
import { Button } from '../Button/Button';
import type { ComponentPropsWithRef, FC } from 'react';

type Props = ComponentPropsWithRef<'button'>;

export const PageButton: FC<Props> = props => {
  const { className, children, ...restProps } = props;

  return (
    <Button
      type="button"
      className={cn(
        'text-body shadow-elements text-primary hover:shadow-primary dark:bg-d-surface1 dark:text-d-white dark:hover:bg-d-elements disabled:bg-primary disabled:shadow-primary dark:disabled:bg-d-accent flex size-8 items-center justify-center bg-white shadow-inner transition disabled:text-white dark:shadow-none',
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
};
