import { useState } from 'react';
import s from './Dropdown.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';

type Props = {
  label: string;
  options: string[];
  choosed?: string;
}

const Dropdown = ({ label, options }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className={s.root}>
      <div className={`${s.wrapper} ${isOpen ? s.wrapper__active : ''}`} onClick={handleClick}>
        <div className={s.dropdown}>
          <label htmlFor={`dropdown-${label}`} className={s.dropdown__label}>{label}</label>
          <Chevron className={s.dropdown__chevron} />
        </div>
      </div>
      {isOpen &&
        <div className={s.root__modal}>
          <div id={`dropdown-${label}`} className={s.modal}>
            {options.map((o, index) =>
              <div className={s.root__option} key={`${o}-${index}`}>
                <div className={s.option}>
                  {o}
                </div>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Dropdown;
