import { ComponentPropsWithRef, FC } from 'react';
import cn from 'clsx';

type ButtonProps = ComponentPropsWithRef<'button'>;

export const Button: FC<ButtonProps> = props => {
  const { className, children, ...restProps } = props;

  return (
    <button className={cn('', className)} {...restProps}>
      {children}
    </button>
  );
};
