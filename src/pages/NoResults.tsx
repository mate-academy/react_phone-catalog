type Props = {
  componentName: string;
};
export const NoResults: React.FC<Props> = ({ componentName }) => {
  return (
    <div className="no-result">
      <h1 className="no-result__title">{`${componentName} not found`}</h1>
    </div>
  );
};
