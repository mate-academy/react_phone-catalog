import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const SliderButton: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <button
      className={twMerge(
        `flex h-8 w-8 items-center justify-center border
       border-icons duration-500 hover:border-primary`,
        className,
      )}
    >
      {children}
    </button>
  );
};
