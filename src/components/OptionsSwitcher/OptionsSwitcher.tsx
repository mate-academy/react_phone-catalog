import cn from 'classnames';
import { createCssColor } from '../../utils/functions';
import './OptionsSwitcher.scss';

interface Props {
  title: string,
  data: string[],
  variant: 'color' | 'capacity'
  currentData: string,
  onChoose: (curData: string, newData: string) => void,
}

export const OptionsSwitcher: React.FC<Props> = ({
  title,
  data,
  variant,
  currentData,
  onChoose,
}) => {
  return (
    <>
      <p className="options-switcher__title">{title}</p>
      <ul className="options-switcher__buttons">
        {
          variant === 'color' && data.map(color => (
            <li key={color}>
              <button
                aria-label="color"
                type="button"
                className={cn('options-switcher__button-color', {
                  'options-switcher__button-color-active':
                    color === currentData,
                })}
                onClick={() => onChoose(currentData, color)}
              >
                <div style={{
                  backgroundColor: createCssColor(color),
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  opacity: 0.5,
                }}
                />
              </button>
            </li>
          ))
        }
        {
          variant === 'capacity' && data.map(cap => (
            <li key={cap}>
              <button
                aria-label="capacity"
                type="button"
                className={cn('options-switcher__button-capacity', {
                  'options-switcher__button-capacity-active':
                    cap === currentData,
                })}
                onClick={() => onChoose(currentData, cap)}
              >
                {cap}

              </button>
            </li>
          ))
        }
      </ul>
    </>
  );
};
