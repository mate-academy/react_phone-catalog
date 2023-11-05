import './featuresInfo.scss';

type Props = {
  title: string,
  value?: string,
  wide?: boolean,
};

export const FeaturesInfo: React.FC<Props> = ({ title, value, wide }) => (
  <div className="features-info">
    <div className={wide
      ? 'features-info__title-wide'
      : 'features-info__title'}
    >
      {title}
    </div>
    <div className={wide
      ? 'features-info__value-wide'
      : 'features-info__value'}
    >
      {value || 'Not found'}
    </div>
  </div>
);
