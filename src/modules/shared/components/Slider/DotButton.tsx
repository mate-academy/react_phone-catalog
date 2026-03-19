import { Button } from '../ui/Button/Button';
import { ComponentPropsWithRef, FC } from 'react';
import cn from 'clsx';

type PropType = ComponentPropsWithRef<'button'>;

interface DotButtonProps extends PropType {
  isActive: boolean;
}

export const DotButton: FC<DotButtonProps> = props => {
  const { isActive, className, children, ...restProps } = props;

  return (
    <Button
      className={cn(
        'flex size-6 items-center justify-center transition',
        className,
      )}
      type="button"
      {...restProps}
    >
      <div
        className={cn(
          'h-1 w-3.5',
          isActive
            ? 'bg-primary dark:bg-d-white'
            : 'bg-elements dark:bg-d-elements',
        )}
      ></div>
    </Button>
  );
};
