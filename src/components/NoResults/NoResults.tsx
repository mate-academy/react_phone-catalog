import './NoResults.scss';

type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <section>
    <h1>{`The ${category} category is not found.`}</h1>
  </section>
);
