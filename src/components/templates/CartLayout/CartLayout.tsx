type Props = {
  header: React.ReactNode;
  pageTopPart: React.ReactNode;
  productSelectedItems: React.ReactNode;
  productCart: React.ReactNode;
  footer: React.ReactNode;
};

export const CartLayout: React.FC<Props> = ({
  header,
  pageTopPart,
  productSelectedItems,
  productCart,
  footer,
}) => (
  <>
    {header}
    <div
      className="px-4 md:px-6 lg:px-8 max-w-[1200px] w-full m-auto grid grid-cols-4 md:grid-cols-12 gap-4
    lg:grid-cols-24 gap-y-0 mt-6"
    >
      <div className="mb-8 col-span-full">{pageTopPart}</div>
      <div className="col-span-full mb-8 lg:mb-0 lg:col-span-16">
        {productSelectedItems}
      </div>
      <div className="col-span-full lg:col-span-8 ">{productCart}</div>
    </div>

    <div className="border-t border-elements mt-12 md:mt-16 lg:mt-20">
      <div className="px-4 md:px-6 lg:px-8 max-w-[1200px] w-full m-auto">
        {footer}
      </div>
    </div>
  </>
);
