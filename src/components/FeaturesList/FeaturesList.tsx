import { capitalize } from '../../helpers/utils';
import './FeaturesList.scss';

type Props = {
  [key: string]: string | number
};

export const FeaturesList:React.FC<Props> = (props) => {
  return (
    <div className="features-list">
      {Object.keys(props).map((key) => (
        <div key={key} className="features-list__item">
          <div className="features-list__param">
            {capitalize(key)}
          </div>
          <div className="features-list__value">
            {props[key] || 'Not specified'}
          </div>
        </div>
      ))}
    </div>
  );
};
