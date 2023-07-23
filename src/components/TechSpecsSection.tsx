import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <div className="tech description__tech">
      <h2 className="tech__title">{t('techSpecs')}</h2>
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
