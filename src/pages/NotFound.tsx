import type { FC } from 'react';

export const NotFoundPage: FC = () => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 xl:mt-14">
      <img
        src="/images/page-not-found.webp"
        alt="Page not found"
        width={819}
        height={787}
        className="w-full max-w-1/2 sm:max-w-1/3"
      />
      <h1 className="text-h1 text-primary text-center">Page not found</h1>
    </div>
  );
};
