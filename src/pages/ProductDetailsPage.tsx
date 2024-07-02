/* eslint-disable */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import style from '../modules/ProductDetailsPage.module.scss';
import { Category } from '../enums/Category';
import { getPhones } from '../utils/fetchMethods';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Gadgets } from '../types/ContextType/Gadgets';
import { AvailableColors } from '../enums/AvailableColors';
import { IconFavorites } from '../components/Icons/IconFavorites';
import { ThemeContext } from '../store/ThemeProvider';
import classNames from 'classnames';

type Props = {
  type: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ type }) => {
  const { productId } = useParams<{ productId: string }>();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [categoryProduct, setCategoryProduct] = useState<Gadgets>();
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    async function fetchData() {
      let response = await getPhones(type);
      let changesColorIds = '';
      if (response) {
        for (let key in AvailableColors) {
          const splitProductIds = productId?.split('-');
          if (splitProductIds?.join(' ').includes(key)) {
            let convertToIds = splitProductIds.join(' ');
            changesColorIds = convertToIds
              .replaceAll(key, color)
              .split(' ')
              .join('-');
          }
        }

        let detailsProduct = response.find(item => {
          if (color && productId) {
            return item.id === changesColorIds;
          } else {
            return item.id === productId;
          }
        });

        if (detailsProduct) {
          setCategoryProduct(detailsProduct);
          setImage(detailsProduct.images[0]);
        }
      }
    }

    fetchData();
  }, [type, color, productId]);

  if (!categoryProduct) {
    return <div>Loading...</div>;
  }
  const {
    id,
    // category,
    // namespaceId,
    name,
    capacityAvailable,
    // capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    // color,
    images,
    // description,
    screen,
    resolution,
    processor,
    ram,
    // camera,
    // zoom,
    // cell,
  } = categoryProduct;

  console.log(id);

  return (
    <div
      className={classNames(style.product, {
        [style.product__darkTheme]: theme,
      })}
    >
      <BreadCrumbs />

      <span className={style.product__back} onClick={() => navigate(-1)}>
        Back
      </span>

      <h1 className={style.product__phoneName}>{name}</h1>

      <div className={style.product__gridContainer}>
        <ul className={style.product__imagesList}>
          {images.map(image => (
            <li className={style.product__imageItem} key={image}>
              <button
                className={style.product__buttonForImage}
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

        <div className={style.product__mainImageWrapper}>
          <img src={image} alt="Gadget" className={style.product__mainImage} />
        </div>

        <div className={style.product__paramsContainer}>
          <p className={style.product__namesParams}>Available colors</p>
          <p className={style.product__ids}>ID: 802390</p>

          <div className={style.product__availableColors}>
            {colorsAvailable.map(color => {
              const colorNew = {
                backgroundColor:
                  AvailableColors[color as keyof typeof AvailableColors],
              };

              return (
                <Link
                  to={`../${id}`}
                  key={color}
                  className={style.product__colorParam}
                  style={colorNew}
                  onClick={() => setColor(color)}
                ></Link>
              );
            })}
          </div>

          <span className={style.product__line} />

          <div className={style.product__capacityBlock}>
            <p className={style.product__namesParams}>Select capacity</p>
            <div className={style.product__capacityList}>
              {capacityAvailable.map(item => (
                <Link
                  to={'../'}
                  className={style.product__capacityLink}
                  key={item}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <span className={style.product__line} />

          <div className={style.product__orderContainer}>
            <div className={style.product__sectionPrice}>
              <p className={style.product__priceRegular}>${priceRegular}</p>
              <p className={style.product__priceDiscount}>${priceDiscount}</p>
            </div>

            <div className={style.product__orderButtons}>
              <button className={style.product__addToCart}>Add to cart</button>
              <button className={style.product__favorites}>
                <IconFavorites />
              </button>
            </div>

            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>Screen</p>
              <p className={style.product__shortDesValue}>{screen}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>Resolution</p>
              <p className={style.product__shortDesValue}>{resolution}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>Processor</p>
              <p className={style.product__shortDesValue}>{processor}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>RAM</p>
              <p className={style.product__shortDesValue}>{ram}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
