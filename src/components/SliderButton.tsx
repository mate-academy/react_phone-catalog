import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export const SliderButton: React.FC<Props> = ({
  children,
  className = '',
  ...rest
}) => (
  <button
    className={twMerge(
      `flex h-8 min-w-8 items-center justify-center border
     border-icons outline-none duration-500 hover:border-primary`,
      rest.disabled && `pointer-events-none cursor-default border-elements`,
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);
