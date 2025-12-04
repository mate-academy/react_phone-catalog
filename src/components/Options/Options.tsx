import { useNavigate } from 'react-router-dom';
import s from './Options.module.scss';
import { useState } from 'react';
import { Item } from '../../types/Item';

type Props = {
  title: string;
  options: string[];
  optionType: 'color' | 'capacity';
  item: Item;
};

export const Options: React.FC<Props> = ({
  title,
  options,
  optionType,
  item,
}) => {
  const navigate = useNavigate();
  const [choosenColor, setChoosenColor] = useState(item.color);
  const [choosenCapacity, setChoosenCapacity] = useState(item.capacity);

  const handleChangeProduct = (type: 'color' | 'capacity', newChar: string) => {
    let finalColor: string;
    let finalCapacity: string;

    if (type === 'color') {
      setChoosenColor(newChar);
      finalColor = newChar;
      finalCapacity = choosenCapacity;
    } else {
      setChoosenCapacity(newChar);
      finalCapacity = newChar;
      finalColor = choosenColor;
    }

    navigate(
      `/product/${item.namespaceId}-${finalCapacity.toLowerCase()}-${finalColor.replace(' ', '-')}`,
    );
  };

  return (
    <div className={s.options}>
      <span className={s.options__title}>{title}</span>

      <div className={s.options__list}>
        {options.map((option, index) => {
          const isActive =
            (optionType === 'color' && choosenColor === option) ||
            (optionType === 'capacity' && choosenCapacity === option);

          const baseClass = s[`options__${optionType}`];

          const colorClass =
            optionType === 'color' ? s[`options__color--${option}`] : '';

          const activeClass = isActive
            ? s[`options__${optionType}--active`]
            : '';

          return (
            <label
              key={index}
              className={`${baseClass} ${colorClass} ${activeClass}`}
            >
              {optionType === 'capacity' && option}

              <input
                className={s.options__btn}
                type="radio"
                name={optionType}
                value={option}
                onChange={() => {
                  handleChangeProduct(optionType, option);
                }}
              />
            </label>
          );
        })}
      </div>
      <div className={s.options__line}></div>
    </div>
  );
};
