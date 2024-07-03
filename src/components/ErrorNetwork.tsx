import { twMerge } from 'tailwind-merge';
import productNotFoundImg from '../images/product-not-found.png';

interface Props {
  className?: string;
}

export const ErrorNetwork: React.FC<Props> = ({ className = '' }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${productNotFoundImg})`,
      }}
      className={twMerge(
        `flex h-full flex-col items-center justify-between bg-cover bg-center bg-no-repeat`,
        className,
      )}
    ></div>
  );
};
