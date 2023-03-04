/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useContext, useEffect } from 'react';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import { DetailedProductContext } from '../../context/DetailedProductContext';
import { Product } from '../../types/types';
import './Button.scss';

type Props = {
  alt?: string,
  className?: string | boolean,
  image?: string,
  num?: number,
  onClick?: () => void,
  imageClass?: string,
  product?: Product,
  products?: Product[],
};

export const Button: React.FC<Props> = ({
  num, image, alt, className, onClick,
  imageClass, product, products,
}) => {
  const {
    favProducts, setFavProducts,
    visibleFavProducts, setVisibleFavProducts,
  } = useContext(CartAndFavContext) ?? {};
  const {
    detailedProduct,
  } = useContext(DetailedProductContext) ?? {};
  let singleProduct = product;

  const toggleFav = async () => {
    if (products) {
      singleProduct = products.find((one: Product) => {
        return one.phoneId === detailedProduct?.id;
      });
    }

    if (!favProducts || !setFavProducts || !singleProduct
      || !visibleFavProducts || !setVisibleFavProducts) {
      return;
    }

    const exists = favProducts.find((one: Product) => {
      if (singleProduct && one.id === singleProduct.id) {
        return one.id === singleProduct.id;
      }

      return;
    });

    if (exists) {
      setFavProducts(favProducts.filter((
        one: Product,
      ) => one.id !== exists.id));
      setVisibleFavProducts(visibleFavProducts.filter(
        (one: Product) => one.id !== exists.id,
      ));

      if (favProducts.length === 1) {
        localStorage.setItem('favProducts', JSON.stringify([]));
      }

      return;
    }

    setVisibleFavProducts([...visibleFavProducts, singleProduct]);
    setFavProducts([...favProducts, singleProduct]);
  };

  useEffect(() => {
    localStorage.setItem('favProducts', JSON.stringify(favProducts));
  }, [favProducts]);

  return (
    <button
      onClick={!num && image && image.includes('Favourite')
        ? toggleFav
        : onClick}
      className={`button-link ${className}`}
      type="button"
      style={{ border: imageClass && '1px solid rgba(180, 189, 195, 1)' }}
    >
      {
        num ? <div>{num}</div>
          : <img className={`button-image ${imageClass}`} src={image} alt={alt} />
      }
    </button>
  );
};
