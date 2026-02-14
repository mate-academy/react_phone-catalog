import './NoResults.scss';

export type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <h1 className="title no-results">{`${category} not found`}</h1>
);
