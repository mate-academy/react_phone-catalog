import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className = '' }) => (
  <div
    className={twMerge(
      `h-16 w-16 animate-spin rounded-full border-8
      border-dashed border-secondary`,
      className,
    )}
  ></div>
);
