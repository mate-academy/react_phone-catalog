import { NamesBySections } from '../../types/NamesBySections';
import './NoResults.scss';

type Props = {
  caterogy: NamesBySections,
};

export const NoResults: React.FC<Props> = ({ caterogy }) => {
  return (
    <section className="no-results">
      <div className="container">
        <p className="no-results__title">
          {`${caterogy} not found`}
        </p>
      </div>
    </section>
  );
};
