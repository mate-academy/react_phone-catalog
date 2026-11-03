import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface DropdownProps {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select',
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', close);

    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className={cx('dropdown')} ref={ref}>
      {label && <span className={cx('dropdown__label')}>{label}</span>}

      <div className={cx('dropdown__field')}>
        <button
          type="button"
          className={cx('dropdown__trigger', {
            'dropdown__trigger--open': open,
          })}
          onClick={() => setOpen(!open)}
        >
          {value ?? placeholder}
          <span className={cx('dropdown__chevron')} />
        </button>

        {open && (
          <ul className={cx('dropdown__menu')}>
            {options.map(option => (
              <li
                key={option}
                className={cx('dropdown__item')}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
