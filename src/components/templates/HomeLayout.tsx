import React from 'react';

type HomeLayoutProps = {
  heroSlider: React.ReactNode;
  brandNewCarousel: React.ReactNode;
  shopByCategory: React.ReactNode;
  hotPricesCarousel: React.ReactNode;
};

export const HomeLayout: React.FC<HomeLayoutProps> = ({
  heroSlider,
  brandNewCarousel,
  shopByCategory,
  hotPricesCarousel,
}) => (
  <div className="flex flex-col items-center w-full overflow-x-hidden">
    <div className="w-full max-w-[1200px] pt-[24px] md:pt-[32px] lg:pt-[56px] pb-16 lg:pb-20">
      <div className="grid grid-cols-4 md:grid-cols-12 lg:grid-cols-24 gap-4 w-full">
        <section className="col-span-4 md:col-span-12 lg:col-span-24 w-full md:px-6 lg:px-8">
          {heroSlider}
        </section>

        <section className="col-span-4 md:col-span-12 lg:col-span-24 px-4 md:px-6 lg:px-8 mt-[56px] md:mt-[64px] lg:mt-[80px] w-full">
          {brandNewCarousel}
        </section>

        <section className="col-span-4 md:col-span-12 lg:col-span-24 px-4 md:px-6 lg:px-8 mt-[56px] md:mt-[64px] lg:mt-[80px] w-full">
          {shopByCategory}
        </section>

        <section className="col-span-4 md:col-span-12 lg:col-span-24 px-4 md:px-6 lg:px-8 mt-[56px] md:mt-[64px] lg:mt-[80px] w-full">
          {hotPricesCarousel}
        </section>
      </div>
    </div>
  </div>
);
