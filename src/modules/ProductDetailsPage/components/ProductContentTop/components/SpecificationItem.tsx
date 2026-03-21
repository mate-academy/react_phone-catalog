export const SpecificationItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="detailsPage__block">
    <span className="detailsPage__info">{label}</span>
    <span className="detailsPage__value">{value}</span>
  </div>
);
