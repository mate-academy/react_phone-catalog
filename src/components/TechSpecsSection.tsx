import { PhoneInfo } from '../type/PhoneInfo';
import { toUpperCaseFirstLetter } from '../utils/helpers';

const TECH_SPECS: string[] = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
];

type Props = {
  description: PhoneInfo;
};

export const TechSpecsSection: React.FC<Props> = ({ description }) => {
  return (
    <div className="tech description__tech">
      <h2 className="tech__title">Tech specs</h2>
      <ul className="tech__list">
        {TECH_SPECS.map(spec => (
          <li className="tech__item" key={spec}>
            <span className="tech__spec">{toUpperCaseFirstLetter(spec)}</span>
            <span className="tech__value">{description[spec]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
