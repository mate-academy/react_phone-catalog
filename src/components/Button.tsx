import cn from 'clsx';
import type { ComponentPropsWithRef, FC } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'>;

export const Button: FC<ButtonProps> = props => {
  const { className, children, ...restProps } = props;

  return (
    <button className={cn('', className)} {...restProps}>
      {children}
    </button>
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
