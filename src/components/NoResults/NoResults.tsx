type NoResultsProps = {
  category: string,
};

export const NoResults: React.FC<NoResultsProps> = ({
  category,
}) => {
  return (
    <h2 className="title title--large">
      {`${category} not found`}
    </h2>
  );
};
