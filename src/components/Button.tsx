import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  active?: string;
}

export const Button: React.FC<Props> = ({
  children,
  active = '',
  className = '',
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `h-10 w-44 bg-primary font-bold
      text-white transition hover:shadow-[0_3px_13px_0_rgba(23,32,49,0.4)]`,
        active && 'border border-elements bg-none text-green',
        className,
      )}
      {...rest}
    >
      {active || children}
    </button>
  );
};
