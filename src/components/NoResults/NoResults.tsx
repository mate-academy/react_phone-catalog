type NoResultsProps = {
  categoryName: string,
};

export const NoResults: React.FC<NoResultsProps> = ({
  categoryName,
}) => {
  return (
    <div className="no-results-message">
      {`We would like to apologise, we do not have available ${categoryName} right now :(`}
    </div>
  );
};
