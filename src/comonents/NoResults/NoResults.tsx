type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <h3>{`${category} not found`}</h3>
);
