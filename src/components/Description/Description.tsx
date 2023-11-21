import { Description as DescriptionType } from '../../types/phoneDetails';

import './style.scss';

export const Description: React.FC<DescriptionType> = ({ title, text }) => (
  <div className="description__block">
    <h3 className="description__subtitle">
      {title}
    </h3>

    {text.map((paragraph) => (
      <p
        key={paragraph}
        className="description__text"
      >
        {paragraph}
      </p>
    ))}
  </div>
);
