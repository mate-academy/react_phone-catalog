import { FunctionComponent } from 'react';
import classNames from 'classnames';

// Styles
import './TechSpecs.scss';

// Types
import { TechSpec } from '../../types/TechSpec';

type Props = {
  techSpecs: TechSpec[];
  isTextSmall: boolean;
};

export const TechSpecs: FunctionComponent<Props> = ({ techSpecs, isTextSmall }) => (
  <div className={classNames('TechSpecs', {
    'TechSpecs--smallText': isTextSmall,
  })}
  >
    {techSpecs.map(techSpec => (
      <div key={techSpec.key} className="TechSpecs__item">
        {techSpec.key}

        <span className="TechSpecs__value">
          {techSpec.value ? techSpec.value : 'None'}
        </span>
      </div>
    ))}
  </div>
);
