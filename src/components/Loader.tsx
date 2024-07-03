import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className = '' }) => {
  return (
    <div
      className={twMerge(
        `h-16 w-16 animate-spin rounded-full border-8 
        border-dashed border-primary`,
        className,
      )}
    ></div>
  );
};
