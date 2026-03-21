export const TechSpecItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="detailsPage__techSpecs-block">
    <span className="detailsPage__techSpecs-title">{label}</span>
    <span className="detailsPage__techSpecs-value">{value}</span>
  </div>
);
