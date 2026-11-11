import styles from './OptionsToggle.module.scss';

type Props = {
  options: string[];
  activeOption: string;
  onChange: (color: string) => void;
  className?: string;
};

export const OptionsToggle: React.FC<Props> = ({
  options,
  activeOption,
  onChange,
  className,
}) => {
  return (
    <div className={`${styles.options} ${className ?? ''}`}>
      {options.map(option => (
        <span
          key={option}
          className={`${styles.option} ${option === activeOption ? styles.active : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </span>
      ))}
    </div>
  );
};
