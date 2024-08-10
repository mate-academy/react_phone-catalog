import { twMerge } from 'tailwind-merge';
import arrowUpIcon from '../images/icons/arrow-top.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const GoBackButton: React.FC<Props> = ({ className = '', children }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={twMerge(
        `flex w-fit items-center gap-1 border-none
        bg-none text-secondary transition hover:text-primary`,
        className,
      )}
    >
      <img
        className="aspect-square h-full -rotate-90"
        src={arrowUpIcon}
        alt="Back"
      />
      <p>{children}</p>
    </button>
  );
};
