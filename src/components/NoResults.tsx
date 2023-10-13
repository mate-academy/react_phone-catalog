type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <h1>{`${category} not found`}</h1>
);
