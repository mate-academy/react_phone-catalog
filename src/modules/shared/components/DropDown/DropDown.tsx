import { useSearchParams } from 'react-router-dom';
import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import styles from './DropDown.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  defaultValue: string;
  label: string;
  paramKey: string;
};

export const DropDown: FC<Props> = ({
  options,
  defaultValue,
  label,
  paramKey,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentValue = searchParams.get(paramKey) ?? defaultValue;
  const selected = options.find(o => o.value === currentValue);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete(paramKey);
    } else {
      params.set(paramKey, value);
    }

    params.delete('page');

    setSearchParams(params);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={styles['drop-down']}>
      <label className={styles['drop-down__label']}>{label}</label>

      <div
        className={cn(styles['drop-down__control'], {
          [styles['drop-down__control--open']]: open,
        })}
        onClick={() => setOpen(prev => !prev)}
      >
        <span className={styles['drop-down__selected-option']}>
          {selected?.label}
        </span>

        <Icon name={open ? 'arrow_up' : 'arrow_down'} />
      </div>

      {open && (
        <ul className={styles['drop-down__options']}>
          {options.map(opt => (
            <li
              key={opt.value}
              className={styles['drop-down__option']}
              onClick={() => handleChange(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
