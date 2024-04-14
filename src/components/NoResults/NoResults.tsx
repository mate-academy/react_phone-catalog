import './NoResults.scss';

type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <section>
    <h1>{`There are no ${category} yet`}</h1>
  </section>
);
