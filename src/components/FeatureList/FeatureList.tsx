import { capitalize } from '../../helpers/utils';

import './FeatureList.scss';

type Props = {
  [key: string]: string;
};

export const FeatureList: React.FC<Props> = (features) => {
  return (
    <ul className="FeatureList">
      {Object.keys(features).map((key) => (
        <li key={key} className="FeatureList__item">
          <span className="FeatureList__feature-name">
            {capitalize(key)}
          </span>
          <span className="FeatureList__value">
            {features[key] || 'Not specified'}
          </span>
        </li>
      ))}
    </ul>
  );
};
