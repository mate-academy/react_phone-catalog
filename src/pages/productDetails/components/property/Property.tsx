import './property.scss';

type Props = {
  title: string;
  value: string;
};

export const Property: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="property">
      <span className="property__title">{title}</span>
      <span className="property__value">{value}</span>
    </div>
  );
};
