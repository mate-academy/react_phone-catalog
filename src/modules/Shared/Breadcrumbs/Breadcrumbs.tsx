import style from './Breadcrumbs.module.scss'
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const [productName, setProductName] = useState<string>('');

  const getCategory = () => {
    if (location.pathname.includes('/phones')) return 'Phones';
    if (location.pathname.includes('/tablets')) return 'Tablets';
    if (location.pathname.includes('/accessories')) return 'Accessories';
    return null;
  };

  useEffect(() => {
    if (productId) {
      let url = '';
      if (location.pathname.includes('/phones')) {
        url = './api/phones.json';
      } else if (location.pathname.includes('/tablets')) {
        url = './api/tablets.json';
      } else if (location.pathname.includes('/accessories')) {
        url = './api/accessories.json';
      }

      if (url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const product = data.find((item: any) => item.id === productId);
            if (product) {
              setProductName(product.name);
            }
          });
      }
    }
  }, [productId, location.pathname]);

  const category = getCategory();

  if (!category) return null;

  return (
    <>

      <div className={style.breadcrumbs}>
        <NavLink to="/" className={style.breadcrumbs__home}></NavLink>
        <p className={style[`breadcrumbs--arrow`]}>&gt;</p>
        <NavLink to={`/${category.toLowerCase()}`} className={style.breadcrumbs__name}
          style={productId && productName ? { color: '#F1F2F9' } : {}}
        >
          {category}
        </NavLink>
        {productId && productName && (
          <>
            <p className={style[`breadcrumbs--arrow`]}>&gt;</p>
            <p className={style.breadcrumbs__name}>{productName}</p>
          </>
        )}
      </div>
      {productId && productName && (
        <div className={style.breadcrumbs__back}>
          <NavLink to={`/${category.toLowerCase()}`} className={style.breadcrumbs__back__arrow}
          >
            &lt;
          </NavLink>
          <NavLink to={`/${category.toLowerCase()}`} className={style.breadcrumbs__back__text}
          >
            Back
          </NavLink>
        </div>
      )}

    </>
  );
};