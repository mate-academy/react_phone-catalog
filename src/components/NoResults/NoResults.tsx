type Props = {
  category: string;
};

export const NoResult: React.FC<Props> = ({ category }) => {
  const categoryTitle = category[0].toUpperCase() + category.slice(1);

  return (
    <h1 className="title">
      {`${categoryTitle} not found`}
    </h1>
  );
};
