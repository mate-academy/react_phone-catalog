import type React from 'react';

type Props = {
  breadCrumbs: React.ReactNode;
  headingWithCount: React.ReactNode;
  products: React.ReactNode;
};

export const FavoritesLayout: React.FC<Props> = ({
  breadCrumbs,
  headingWithCount,
  products,
}) => (
  <main>
    <section>
      <div
        className="px-4 md:px-6 lg:px-8 max-w-300 w-full m-auto grid grid-cols-4 md:grid-cols-12 gap-4
          lg:grid-cols-24 gap-y-0 mt-6"
      >
        <div className="col-span-full">{breadCrumbs}</div>

        <div className="col-span-full pt-6 pb-8 md:pt-10 md:pb-10">
          {headingWithCount}
        </div>
        <div className="col-span-full mb-14 md:mb-16 lg:mb-20">{products}</div>
      </div>
    </section>
  </main>
);
