// import { useNavigate } from 'react-router-dom';
// import { useIsMobile } from '@/modules/HomePage/components/Phone Carusel/isMobileHook';
import { Product } from '@/shared/types/Product';
import style from './Card.module.scss';
import { getProductTitle } from './helpers';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/shared/context/CartContext/useCart';

export const ProductCard = ({ product }: { product: Product }) => {
  const { image, itemId, capacity } = product;

  const { clearCart } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <div className={style.order}>
        <div className={style.order__content}>
          <div className={style.order__titleBlock}>
            <h4 className={style.order__title}>
              {t('home.newAvailable.title')}
              <img
                className={style.order__nice}
                src="icons/nice.svg"
                alt="nice"
              />
            </h4>
          </div>

          <p className={style.order__addInfo}>
            {t('home.newAvailable.beTheFirst')}
          </p>
          <button className={style.order__buy} onClick={() => handleCheckout()}>
            {t('home.newAvailable.orderNow')}
          </button>
        </div>
      </div>
      <div className={style.slide}>
        <div className={style.titleBlock}>
          <Link to={`/product/${itemId}`}>
            <h2 className={style.title}>{getProductTitle(product)}</h2>
          </Link>
        </div>
        <p className={style.model}>{capacity}</p>
        <div className={style.imageBlock}>
          <Link to={`/product/${itemId}`}>
            <img className={style.img} src={`${image}`} alt={itemId} />
          </Link>
        </div>
      </div>
    </>
  );
};
