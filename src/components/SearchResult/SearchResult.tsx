import { Phone } from '../../Types/Phone';
import { Card } from '../Card/Card';

type Props = {
  results: Phone[],
};

export const SearchResult: React.FC<Props> = ({ results = [] }) => {
  return (
    <div className="phones">
      <p className="path">{`${results.length} results`}</p>
      {results.length ? (
        <div className="phones-container">
          {results.map(phone => (
            <Card card={phone} discount key={phone.id} />
          ))}
        </div>
      ) : (
        <h1>No matching results</h1>
      )}
    </div>
  );
};
