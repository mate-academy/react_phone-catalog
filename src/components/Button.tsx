import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  activeClassName?: string;
}

export const Button: React.FC<Props> = ({
  children,
  active = false,
  className = '',
  activeClassName = '',
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `h-10 w-44 bg-primary font-bold
      text-white transition hover:shadow-[0_3px_13px_0_rgba(23,32,49,0.4)]`,
        active && 'border border-elements bg-white text-green',
        className,
        active && activeClassName,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
