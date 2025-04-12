import { useContext } from 'react';
import s from './CatalogHeaderPath.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductsContext';

export const CatalogHeaderPath = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const productName = productId
    ? products.find(item => item.id === +productId)?.name
    : '';
  const productCategory = productId
    ? products.find(item => item.id === +productId)?.category
    : '';

  return (
    <div className={s.header__path}>
      <div className={s.header__path_img}>
        <Link to="/">
          <img
            src="./img/icons/homePart1.png"
            alt="go home"
            className={s.header__path_img_1}
          />
          <img
            src="./img/icons/homePart2.png"
            alt="go home"
            className={s.header__path_img_2}
          />
        </Link>
      </div>
      <img src="./img/icons/next.png" alt="next" />
      <div className={s.header__path_folder}>
        <Link
          to={productId ? `../${productCategory}` : ''}
          style={{ color: productId ? '$white' : 'inherit' }}
        >
          {productCategory
            ? productCategory[0].toUpperCase() + productCategory.slice(1)
            : pathname[1].toUpperCase() + pathname.slice(2)}
        </Link>
      </div>
      {productId && (
        <>
          <img src="./img/icons/next.png" alt="next" />
          <div className={s.header__path_folder}>{productName}</div>
        </>
      )}
    </div>
  );
};
