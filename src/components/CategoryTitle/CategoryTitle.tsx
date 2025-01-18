type Props = {
  title: string;
  productsCount: number;
};

export const CategoryTitle: React.FC<Props> = ({ title, productsCount }) => {
  return (
    <div className="categoryTitle">
      <h1>{title}</h1>
      <p className="categoryTitle__models">{`${productsCount} models`}</p>
    </div>
  );
};
