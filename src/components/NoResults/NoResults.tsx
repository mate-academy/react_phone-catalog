type NoResultsProps = {
  category: string,
};

export const NoResults: React.FC<NoResultsProps> = ({
  category,
}) => {
  return (
    <p className="title title--large">
      {`${category} not found`}
    </p>
  );
};
