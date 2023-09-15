import { NoResultsCaseName } from '../../types/NoResultsCase';
import './no-results.scss';
import { defaultCase, noResultsCases } from '../../assets/noResultsCases';

type Props = {
  query?: string;
  caseName: NoResultsCaseName;
};

export const NoResults: React.FC<Props> = ({ query, caseName }) => {
  const currentCase = noResultsCases.find(noResultsCase => (
    noResultsCase.name === caseName
  )) || defaultCase;

  const {
    name,
    image,
    warningText,
    suggestionText,
  } = currentCase;

  return (
    <div className="no-results">
      <img
        src={image}
        alt={name}
        className="no-results__image"
      />

      <p className="no-results__warning">
        {query ? `"${query}" ${warningText}` : warningText}
      </p>

      <p className="no-results__suggestion">
        {suggestionText}
      </p>
    </div>
  );
};
