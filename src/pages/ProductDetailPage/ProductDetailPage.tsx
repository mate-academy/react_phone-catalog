type Props = {
  category: string;
};

export const ProductDetailPage = ({ category }: Props) => {
  return (
    <>
      <div>{category}</div>
      <div>ProductDetailPage</div>
    </>
  );
};
