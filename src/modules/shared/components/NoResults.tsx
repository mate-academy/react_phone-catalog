import { GoHomeButton } from './ui/Button/GoHomeButton';
import type { FC } from 'react';

interface Props {
  text: string;
}

export const NoResults: FC<Props> = ({ text }) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 xl:mt-14">
      <img
        src="images/product-not-found.webp"
        alt={text}
        width={819}
        height={787}
        className="w-full max-w-1/2 sm:max-w-1/3"
      />
      <h2 className="text-h1 text-primary dark:text-d-white text-center">
        {text}
      </h2>
      <GoHomeButton />
    </div>
  );
};
