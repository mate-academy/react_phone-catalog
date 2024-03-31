import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active: boolean;
  disabled: boolean;
  children: React.ReactNode;
}

export const PaginationItem: React.FC<Props> = ({
  className = '',
  children,
  active,
  disabled,
  ...rest
}) => {
  const customClassName = twMerge('flex h-8 w-8 justify-center text-primary');

  if (disabled) {
    return (
      <span className={twMerge('items-end', customClassName)}>{children}</span>
    );
  }

  return (
    <button
      className={twMerge(
        `items-center
      border border-icons transition hover:border-primary`,
        customClassName,
        active && 'border-primary bg-primary text-white',
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};
