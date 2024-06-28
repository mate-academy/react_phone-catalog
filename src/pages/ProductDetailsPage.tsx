/* eslint-disable */
import { Link, useLocation } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import style from '../modules/ProductDetailsPage.module.scss';
import { Category } from '../enums/Category';
import { getAccessories, getPhones, getTablets } from '../utils/fetchMethods';
import { useEffect } from 'react';
import { useState } from 'react';
import { Phones } from '../types/ContextType/Phones';
import { Tablets } from '../types/ContextType/Tablets';
import { Accessories } from '../types/ContextType/Accessories';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const relevantPath = pathname.split('/').filter(item => item !== '');
  const [categoryProduct, setCategoryProduct] = useState<
    Phones[] | Tablets[] | Accessories[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      let response;

      switch (relevantPath[0]) {
        case Category.phones:
          response = await getPhones(`/${Category.phones}.json`);
          break;
        case Category.tablets:
          response = await getTablets(`/${Category.tablets}.json`);
          break;
        case Category.accessories:
          response = await getAccessories(`/${Category.accessories}.json`);
          break;
        default:
          break;
      }

      if (response) {
        const detailsProduct = response.filter(
          item => item.id === relevantPath[1],
        );

        setCategoryProduct(detailsProduct);
      }
    }

    fetchData();
  }, [relevantPath[1]]);

  const initialMainImage = categoryProduct.map(item => item.images);
  const resultImage = initialMainImage.length > 0 ? initialMainImage[0][0] : '';
  const [image, setImage] = useState('');
  return (
    <div className={style.product}>
      <div className={style.product__container}>
        <BreadCrumbs />

        <Link to={`..//${relevantPath[0]}`} className={style.product__link}>
          <span className={style.product__paragraph}>Back</span>
        </Link>
      </div>
      {categoryProduct.map(item => (
        <div key={item.id}>
          <h1 className={style.product__phoneName}>{item.name}</h1>

          <div className={style.product__gridContainer}>
            <ul className={style.product__imageList}>
              {item.images.map(image => (
                <li className={style.product__imageItem} key={image}>
                  <button className={style.product__buttonImage} onClick={() => setImage(image)}>
                    <img
                      src={image}
                      alt="Gadget"
                      className={style.product__smallImage}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className={style.product__mainImageContainer}>
              <img src={image ? image : resultImage} alt="Gadget" className={style.product__mainImage}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
