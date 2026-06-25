import './TechSpecs.scss';

interface SpecRow {
  label: string;
  value: string;
}

interface Props {
  specs: SpecRow[];
}

export function TechSpecs({ specs }: Props) {
  return (
    <div className="tech-specs">
      <h3 className="tech-specs__title">Tech specs</h3>
      <div className="tech-specs__table">
        {specs.map(({ label, value }) => (
          <div key={label} className="tech-specs__row">
            <span className="tech-specs__label">{label}</span>
            <span className="tech-specs__value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
