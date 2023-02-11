import { useContext, useEffect } from 'react';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import { DetailedProductContext } from '../../context/DetailedProductContext';
import './Button.scss';

export const Button = ({
  num, image, alt, className, onClick,
  imageClass, disabled, product, products,
}: any) => {
  const {
    favProducts, setFavProducts,
    visibleFavProducts, setVisibleFavProducts,
    // isAddedToFav, setIsAddedToFav,
  } = useContext<any>(CartAndFavContext);
  const {
    detailedProduct,
  } = useContext<any>(DetailedProductContext);

  const toggleFav = async () => {
    if (products) {
      product = products.find((one) => {
        return one.phoneId === detailedProduct.id;
      });
    }

    // setIsAddedToFav(!isAddedToFav);
    const exists = favProducts.find((one: any) => {
      if (one.id === product.id) {
        return one.id === product.id;
      }
    });

    if (exists) {
      setFavProducts(favProducts.filter((one: any) => one.id !== exists.id));
      setVisibleFavProducts(visibleFavProducts.filter(
        (one) => one.id !== exists.id,
      ));

      if (favProducts.length === 1) {
        localStorage.setItem('favProducts', JSON.stringify([]));
      }

      return;
    }

    setVisibleFavProducts([...visibleFavProducts, product]);
    setFavProducts([...favProducts, product]);
  };

  useEffect(() => {
    localStorage.setItem('favProducts', JSON.stringify(favProducts));
  }, [favProducts]);

  return (
    // <Link to={link}>
    <button
      onClick={(event) => {
        !num && image.includes('Favourite')
          ? toggleFav(event)
          : onClick();
      }}
      // onClick={image.includes('Heart') ? toggleFav :onClick}
      className={`button-link ${className}`}
      type="button"
    >
      {
        num ? <div>{num}</div>
          : <img className={`button-image ${imageClass}`} src={image} alt={alt} />
      }
    </button>
  );
};
