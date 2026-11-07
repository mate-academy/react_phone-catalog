type Props = {
  pageProductDetails: React.ReactNode;
  productGallery: React.ReactNode;
  productConfigurator: React.ReactNode;
  productAbout: React.ReactNode;
  techSpecs: React.ReactNode;
  productsCarousel: React.ReactNode;
};

export const ProductItemLayout: React.FC<Props> = ({
  pageProductDetails,
  productGallery,
  productConfigurator,
  productAbout,
  techSpecs,
  productsCarousel,
}) => (
  <>
    <div
      className="px-4 md:px-6 lg:px-8 max-w-[1200px] w-full m-auto grid grid-cols-4 md:grid-cols-12 gap-4
    lg:grid-cols-24 gap-y-0 mt-6 mb-14 md:mb-16 lg:mb-20"
    >
      <div className="mb-8 md:mb-10 col-span-full">{pageProductDetails}</div>
      <div className="mb-10 col-span-full md:col-span-7 lg:col-span-12">
        {productGallery}
      </div>
      <div className="hidden lg:block lg:col-span-1"></div>
      <div className="col-span-full mb-14 md:col-span-5 lg:col-span-11">
        {productConfigurator}
      </div>
      <div className="col-span-full mb-14 lg:col-span-12">{productAbout}</div>
      <div className="hidden lg:block lg:col-span-1"></div>
      <div className="col-span-full mb-14 lg:col-span-11">{techSpecs}</div>

      <div className="col-span-full">{productsCarousel}</div>
    </div>
  </>
);
