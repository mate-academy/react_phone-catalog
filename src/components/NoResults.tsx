export type NoResultsProps = {
  title: string
};

export const NoResults = ({ title }: NoResultsProps) => {
  return (
    <h1 className="page__title h1">{`${title} not found`}</h1>
  );
};
