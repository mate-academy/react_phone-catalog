/* eslint-disable */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import style from '../modules/ProductDetailsPage.module.scss';
import { Category } from '../enums/Category';
import { getPhones } from '../utils/fetchMethods';
import { useEffect } from 'react';
import { useState } from 'react';
import { Gadgets } from '../types/ContextType/Gadgets';

type Props = {
  type: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ type }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [categoryProduct, setCategoryProduct] = useState<Gadgets>();

  const [image, setImage] = useState('');
  useEffect(() => {
    async function fetchData() {
      let response = await getPhones(type);

      if (response) {
        const detailsProduct = response.filter(item => item.id === productId);
        setCategoryProduct(detailsProduct[0]);
        setImage(detailsProduct[0].images[0]);
      }
    }

    fetchData();
  }, [productId, type]);

  if (!categoryProduct) {
    return <div>Loading...</div>;
  }

  const {
    id,
    // category,
    // namespaceId,
    name,
    // capacityAvailable,
    // capacity,
    // priceRegular,
    // priceDiscount,
    colorsAvailable,
    // color,
    // images,
    // description,
    // screen,
    // resolution,
    // processor,
    // ram,
    // camera,
    // zoom,
    // cell,
  } = categoryProduct;
  console.log(colorsAvailable);

  return (
    <div className={style.product}>
      <div className={style.product__contaainer}>
        <BreadCrumbs />

        <span className={style.product__back} onClick={() => navigate(-1)}>
          Back
        </span>
      </div>
      <div key={id}>
        <h1 className={style.product__phoneName}>{name}</h1>

        <div className={style.product__gridContainer}>
          <ul className={style.product__imageList}>
            {categoryProduct.images.map(image => (
              <li className={style.product__imageItem} key={image}>
                <button
                  className={style.product__buttonImage}
                  onClick={() => setImage(image)}
                >
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
            <img
              src={image}
              alt="Gadget"
              className={style.product__mainImage}
            />
          </div>

          <div className={style.product__availableColors}>
            {colorsAvailable.map(color => {
              const colorNew = { backgroundColor: color };

              return (
                <Link
                  to={'../'}
                  key={color}
                  className={style.product__colorParam}
                  style={colorNew}
                ></Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
