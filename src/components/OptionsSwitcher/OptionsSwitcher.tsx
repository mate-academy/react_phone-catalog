import './OptionsSwitcher.scss';
import cn from 'classnames';

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
            <li>
              <button
                aria-label="color"
                type="button"
                className={cn('options-switcher__button-color', {
                  'options-switcher__button-color-active':
                    color === currentData,
                })}
                key={color}
                onClick={() => onChoose(currentData, color)}
              >
                <div style={{
                  backgroundColor: color,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  opacity: 0.3,
                }}
                />
              </button>
            </li>
          ))
        }
        {
          variant === 'capacity' && data.map(cap => (
            <li>
              <button
                aria-label="capacity"
                type="button"
                className={cn('options-switcher__button-capacity', {
                  'options-switcher__button-capacity-active':
                    cap === currentData,
                })}
                key={cap}
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
