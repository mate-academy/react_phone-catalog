import { TechSpeck } from '../types/TechSpec';

type Props = {
  list: TechSpeck[];
};

const TechSpecs: React.FC<Props> = ({ list }) => {
  return (
    <ul className="TechSpec__details-list">
      {list.map(item => (
        <li key={item.name} className="TechSpec__details-item">
          <span className="TechSpec__name">
            {item.name}
          </span>
          <span className="TechSpec__spec">
            {item.spec || '-'}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TechSpecs;
