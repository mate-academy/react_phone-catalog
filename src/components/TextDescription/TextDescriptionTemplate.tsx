type Props = {
  text: string;
  value: string;
};

export const TextDescriptionTemplate: React.FC<Props> = ({ text, value }) => (
  <div className="product-details-description__text-container">
    <div className="description-text-template">{text}</div>
    <div className="description-value-template">{value}</div>
  </div>
);
