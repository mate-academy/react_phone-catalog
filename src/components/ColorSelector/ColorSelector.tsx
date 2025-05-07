import style from './ColorSelector.module.scss';
import { productColors } from '../../modules/constants';
import classNames from 'classnames';

type Props = {
  colors: string[];
  selectedColor: string;
  onClick: (color: string) => void;
};

export const ColorSelector: React.FC<Props> = ({
  colors,
  selectedColor,
  onClick,
}) => {
  return (
    <div className={style.color_selector_container}>
      <p className={style.title}>Available colors</p>
      <div className={style.colors_container}>
        {colors &&
          colors.map(color => {
            const cleanColor = color.replace(' ', '');

            return (
              <div
                key={color}
                className={classNames(style.outer, style.circle, {
                  [style.selected]: selectedColor === cleanColor,
                })}
                onClick={() => onClick(cleanColor)}
              >
                <div
                  style={{
                    backgroundColor: `${productColors[cleanColor as keyof typeof productColors]}`,
                  }}
                  className={classNames(style.inner, style.circle)}
                ></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
