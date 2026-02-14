import styles from './Specification.module.scss';
const {
  spec,
  spec__text,
  page__context,
  card__context,
  spec__context,
  spec__label,
} = styles;

type SpecificationProps = {
  label:
    | 'Screen'
    | 'Capacity'
    | 'RAM'
    | 'Processor'
    | 'Resolution'
    | 'Built in memory'
    | 'Camera'
    | 'Zoom'
    | 'Cell';
  value: string | string[];
  context?: 'card' | 'page' | 'spec__page';
};

export const Specification = ({
  label,
  value,
  context,
}: SpecificationProps) => {
  const contextClass =
    context === 'card'
      ? card__context
      : context === 'page'
        ? page__context
        : spec__context;

  const newValue = Array.isArray(value) ? value.slice(0, 5).join(', ') : value;

  return (
    <div className={`${spec} ${contextClass}`}>
      <small className={`${spec__label} ${contextClass}`}>{label}</small>

      <small className={`${spec__text} ${contextClass}`}>{newValue}</small>
    </div>
  );
};
