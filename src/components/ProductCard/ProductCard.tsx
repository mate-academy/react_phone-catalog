import { Link } from 'react-router-dom';
import { AllProductsType } from '../../types/AllProductsType';
//TODO: in the future, imports for the roads!!!
//TODO:in the future, imports for FavAddButton!!!
import style from './ProductCard.module.scss';

type Props = {
  product: AllProductsType;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  const screen = product.screen.split(' ').slice(0, 2).join(' ');
  const capacity = product.capacity.replace(/(\d)([A-Za-z])/g, '$1 $2');
  const titleModelPhoto = product.image;
  const modelName = product.name;
  const modelId = product.itemId;
  const category = product.category;
  // айди будет в кнопки фаворит
  // const id = product.id;
  const priceRegular = `$${product.fullPrice}`;
  const priceDiscount = `$${product.price}`;

  let ram = product.ram;

  if (ram.startsWith('0')) {
    const match = ram.match(/^([\d.]+)([A-Za-z]+)$/);

    if (match) {
      ram = `${Math.round(parseFloat(match[1]) * 1024)}MB`;
    }
  }

  return (
    <div className={style.container} key={modelId}>
      <Link
        to={`/${category}/${modelId}`}
        className={style.photoNameContainer}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className={style.devicePhoto}>
          <img
            className={style.photo}
            src={titleModelPhoto}
            alt="device photo"
          />
        </div>

        <div className={style.nameContainer}>
          <div className={style.name}>{modelName}</div>
        </div>
      </Link>

      <div className={style.priceContainer}>
        {showDiscount ? (
          <>
            <div className={style.price}>{priceDiscount}</div>
            <div className={`${style.price} ${style.oldPrice}`}>
              {priceRegular}
            </div>
          </>
        ) : (
          <div className={style.price}>{priceRegular}</div>
        )}
      </div>

      <div className={style.info}>
        <div className={style.screen}>
          <div className={style.specName}>Screen</div>
          <div className={style.specValue}>{screen}</div>
        </div>

        <div className={style.capacity}>
          <div className={style.specName}>Capacity</div>
          <div className={style.specValue}>{capacity}</div>
        </div>

        <div className={style.ram}>
          <div className={style.specName}>RAM</div>
          <div className={style.specValue}>{ram}</div>
        </div>
      </div>

      {/* TODO: <FavoritesAddButton productId={id} /> */}
    </div>
  );
};
