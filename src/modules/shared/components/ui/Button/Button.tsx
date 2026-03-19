import cn from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type ButtonOwnProps<E extends ElementType> = {
  as?: E;
  children?: ReactNode;
};

/* eslint-disable @typescript-eslint/indent */
type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;
/* eslint-enable @typescript-eslint/indent */

export const Button = <E extends ElementType = 'button'>({
  as,
  children,
  className,
  ...restProps
}: ButtonProps<E>) => {
  const Tag = as || 'button';

  return (
    <Tag className={cn('', className)} {...restProps}>
      {children}
    </Tag>
  );
};

// type ButtonOwnProps<E extends ElementType> = {
//   as?: E;
//   children: ReactNode;
// };
//
// type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
//   Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;
//
// export const Button = <E extends ElementType = 'button'>({
//   as,
//   children,
//   props,
// }: ButtonProps<E>) => {
//   const Tag = as || 'button';
//
//   return <Tag {...props}>{children}</Tag>;
// };
