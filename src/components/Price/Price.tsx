interface Props {
  discount: number;
  regular: number;
  showDiscount?: boolean;
}

export const Price: React.FC<Props> = ({ discount, regular, showDiscount }) => {
  const hasDiscount = showDiscount && discount < regular;

  return (
    <>
      <span className="price-current">${discount}</span>
      {hasDiscount && <span className="price-old">${regular}</span>}
    </>
  );
};
