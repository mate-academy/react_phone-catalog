import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { Card } from '../Card';
import { Products } from '../../../type/Productes';

import style from './ProductsSlider.module.scss';

type Props = {
  produkts: Products[];
  title: string;
  handleClick: (click: string) => void;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  produkts,
  handleClick,
}) => {
  return (
    <div className={style.sliders}>
      <div className={style.sliders__container}>
        <div className={style.sliders__header}>
          <h3 className={style.sliders__title}>{title}</h3>
          <div className={style.sliders__buttons}>
            <button
              type="button"
              aria-label="Back"
              onClick={() => handleClick('back')}
              className={style.sliders__button}
            >
              <IoIosArrowBack />
            </button>
            <button
              type="button"
              aria-label="Forward"
              onClick={() => handleClick('forward')}
              className={style.sliders__button}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div className={style.sliders__cards} data-cy="cardsContainer">
          {produkts.map(produkt => (
            <Card key={produkt.id} produkt={produkt} />
          ))}
        </div>
      </div>
    </div>
  );
};
