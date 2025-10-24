import { FC } from 'react';

export const NotFoundPage: FC = () => {
  return (
    <section className="mx-auto flex max-w-min shrink-0 grow flex-col items-center justify-center gap-y-[24px]">
      <picture>
        <img
          src="/images/page-not-found.webp"
          alt="Page not found"
          width={819}
          height={787}
          className="w-full"
        />
      </picture>
      <h1 className="text-nowrap text-h1">Page not found</h1>
    </section>
  );
};
