import classNames from 'classnames';
import { FaRegHeart } from 'react-icons/fa';
import { LuHeartOff } from 'react-icons/lu';
import { useContext, useEffect, useState } from 'react';
import { Details } from '../../../../type/Details';
import { getProducts } from '../../../../api';
import { Products } from '../../../../type/Productes';
import { ProductContext } from '../../../../context/ProductContext';
import { hasProdPriceList } from '../../../../utils';
import style from './Options.module.scss';

type Props = {
  details: Details;
  selectColor: string | null;
  setSelectColor: React.Dispatch<React.SetStateAction<string | null>>;
  selectCapacity: string | null;
  setSelectCapacity: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Options: React.FC<Props> = ({
  details,
  selectColor,
  setSelectColor,
  selectCapacity,
  setSelectCapacity,
}) => {
  const [id, setId] = useState<string | number>('');
  const { priceList, favourites, setSelectIdFavorit, setSelectIdCart } =
    useContext(ProductContext);

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      const product = data.find(d => d.itemId === details.id);

      if (product) {
        setId(product.id);
      }
    });
  }, [details.id]);

  const hasElement = () => {
    return favourites.find(item => item.id === id) !== undefined;
  };

  return (
    <div className={style.options}>
      <div className={style.options__header}>
        <span className={style.options__title}>Available colors</span>
        <span className={style.options__id}>{id}</span>
      </div>
      <div className={style.options__container}>
        {details.colorsAvailable.map(color => (
          <button
            type="button"
            aria-label="color"
            onClick={() => setSelectColor(color)}
            key={color}
            className={classNames(style.options__colorDiv, {
              [style.options__color_actice]: color === selectColor,
            })}
          >
            <div
              style={{ backgroundColor: color }}
              className={style.options__itemColor}
            />
          </button>
        ))}
      </div>

      <div className={style.options__capacity}>
        <span className={style.options__title}>Select capacity</span>
        <div className={style.options__container}>
          {details.capacityAvailable.map(capacity => (
            <button
              type="button"
              aria-label="capacity"
              onClick={() => setSelectCapacity(capacity)}
              key={capacity}
              className={classNames(style.options__capacity_div, {
                [style.options__capacity_actice]: capacity === selectCapacity,
              })}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      <div className={style.options__price}>
        <span
          className={style.options__discoun}
        >{`$${details.priceDiscount}`}</span>
        <span
          className={style.options__regular}
        >{`$${details.priceRegular}`}</span>
      </div>

      <div className={style.options__button}>
        <button
          type="button"
          onClick={() => setSelectIdCart(+id)}
          className={style.options__button_by}
        >
          {!hasProdPriceList(+id, priceList)
            ? 'Add to cart'
            : 'The product has been added'}
        </button>
        <button
          type="button"
          aria-label="like"
          className={style.options__button_like}
          onClick={() => {
            if (hasElement()) {
              setSelectIdFavorit(-1);

              return;
            }

            setSelectIdFavorit(+id);
          }}
        >
          {(!hasElement() && <FaRegHeart />) || <LuHeartOff />}
        </button>
      </div>

      <div className={style.options__specs}>
        <div className={style.options__specs_item}>
          <span className={style.options__specs_title}>Screen</span>
          <span>{details.screen}</span>
        </div>
        <div className={style.options__specs_item}>
          <span className={style.options__specs_title}>Resolution</span>
          <span>{details.resolution}</span>
        </div>
        <div className={style.options__specs_item}>
          <span className={style.options__specs_title}>Processor</span>
          <span>{details.processor}</span>
        </div>
        <div className={style.options__specs_item}>
          <span className={style.options__specs_title}>RAM</span>
          <span>{details.ram}</span>
        </div>
      </div>
    </div>
  );
};
