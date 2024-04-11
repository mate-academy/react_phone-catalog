import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonHeader: React.FC<Props> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `flex w-full cursor-pointer
          items-center justify-center	border-l
          border-t border-elements before:hidden`,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
