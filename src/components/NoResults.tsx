type Props = {
  categoryName: string;
};

export const NoResults: React.FC<Props> = ({ categoryName }) => {
  return (
    <div className="message">
      <h3>{`${categoryName} not found`}</h3>
    </div>
  );
};
