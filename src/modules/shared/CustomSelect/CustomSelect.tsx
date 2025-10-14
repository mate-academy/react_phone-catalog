import { useEffect } from 'react';
import s from './CustomSelect.module.scss';

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  label: string;
  open: boolean;
  onToggle: () => void;
};

export const CustomSelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  label,
  open,
  onToggle,
}) => {
  const selected = options.find(opt => opt.value === value);

  useEffect(() => {
    if (!value && options.length > 0) {
      onChange(options[0].value);
    }
  }, [value, options, onChange]);

  const handleSelect = (val: string | number) => {
    onChange(val);
    onToggle();
  };

  return (
    <div className={s.filter}>
      <label className={s.filterLabel}>{label}</label>

      <div className={s.selectWrapper}>
        <button type="button" className={s.selectButton} onClick={onToggle}>
          {selected?.label || options[0]?.label}
          <span className={`${s.arrow}${open ? ` ${s.arrowUp}` : ''}`}></span>
        </button>

        {open && (
          <ul className={s.options}>
            {options.map(opt => (
              <li
                key={opt.value}
                className={`${s.option} ${opt.value === value ? s.active : ''}`}
              >
                <button
                  type="button"
                  className={s.optionButton}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
