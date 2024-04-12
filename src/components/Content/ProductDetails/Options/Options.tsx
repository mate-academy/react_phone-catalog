import classNames from 'classnames';
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Details} from '../../../../type/Details';
import {ProductContext} from '../../../../context/ProductContext';
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
  const {product} = useContext(ProductContext);
  const [id, setId] = useState<string | number>('');
  const {priceList, favourites, setProductExists, setSelectIdCart} =
    useContext(ProductContext);

  const location = useLocation();
  const {pathname} = location;

  useEffect(() => {
    const hasProduct = product.find(d => d.itemId === details.id);

    if (hasProduct) {
      setId(hasProduct.id);
    }
  }, [details.id]);

  const hasElementFavorit = () => {
    return favourites?.some(item => item?.id === id) ?? false;
  };

  const hasElementCart = () => {
    return priceList?.some(item => +item?.id === +id) ?? false;
  };

  const handleSelectColor = (color: string) => {
    const pathColor = pathname.replace(selectColor || '', color);

    setSelectColor(color);
    window.location.replace(`#${pathColor}`);
  };

  const handleSelectCapacity = (capacity: string) => {
    const pathCapacity = pathname.replace(
      selectCapacity?.toLowerCase() || '',
      capacity,
    );

    setSelectCapacity(capacity);
    window.location.replace(`#${pathCapacity}`);
  };

  const handleClickFavorit = (productId: string | number) => {
    if (hasElementFavorit()) {
      return setProductExists({hasProdPriceList: true, id: productId});
    }

    return setProductExists({hasProdPriceList: false, id: productId});
  };

  const handleClickCart = (productId: string | number) => {
    if (hasElementCart()) {
      return setSelectIdCart({hasProdPriceList: true, id: productId});
    }

    return setSelectIdCart({hasProdPriceList: false, id: productId});
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
            onClick={() => handleSelectColor(color)}
            key={id}
            className={classNames(style.options__colorDiv, {
              [style.options__color_actice]: color === selectColor,
            })}
          >
            <div
              style={{backgroundColor: color}}
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
              onClick={() => handleSelectCapacity(capacity)}
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
          onClick={() => handleClickCart(id)}
          className={classNames(style.options__button_by, {
            [style.options__button_byActive]: hasElementCart(),
          })}
        >
          {!hasElementCart() ? 'Add to cart' : 'Added'}
        </button>
        <button
          type="button"
          aria-label="like"
          className={style.options__button_like}
          onClick={() => handleClickFavorit(id)}
        >
          {(!hasElementFavorit() && <FaRegHeart />) || (
            <FaHeart style={{color: 'red'}} />
          )}
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
