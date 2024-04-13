import { twMerge } from 'tailwind-merge';

interface Props {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const ButtonCard: React.FC<Props> = ({
  id,
  className = '',
  children,
}) => {
  return (
    <button
      id={id}
      className={twMerge(
        'bg-primary text-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]',
        className,
      )}
    >
      {children}
    </button>
  );
};
