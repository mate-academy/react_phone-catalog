type Props = {
  category: string,
};

export const NoResults:React.FC<Props> = ({ category }) => {
  const title = category.slice(0, 1).toUpperCase() + category.slice(1);

  return (
    <div className="page__not-found">
      <h3>{`${title} not found`}</h3>
    </div>
  );
};
