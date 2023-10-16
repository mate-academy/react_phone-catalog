type OldPriceProps = {
  children: React.ReactNode
};

export const OldPrice = ({ children }: OldPriceProps) => {
  const formatedPrice = `$${children}`;

  return <h2 className="old-price">{formatedPrice}</h2>;
};
