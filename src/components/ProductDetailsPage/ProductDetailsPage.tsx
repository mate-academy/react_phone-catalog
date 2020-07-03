import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import BreadCrums from '../Breadcrumbs/Breadcrumbs';
import { getProducts, getDetails } from '../../helpers/api';
import './ProductDetailsPage.scss';

import ProductInfo from '../ProductInfo/ProductInfo';
import FavoriteButton from '../Buttons/FavoriteButton';
import CartButton from '../Buttons/CartButtons';
import GoBack from '../GoBack/GoBack';


const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [details, setDetails] = useState<ProductDetails>();
  const [currentImg, setcurrentImg] = useState<string>();


  useEffect(() => {
    const loadData = async () => {
      const loadedProduct = await getProducts();

      setData(loadedProduct);
      setCurrentProduct(loadedProduct.find((item: Product) => item.id === productId));
    };

    loadData();
  }, [productId]);


  useEffect(() => {
    const loadDetails = async () => {
      const loadedDetails = await getDetails(productId);

      setDetails(loadedDetails);
    };

    loadDetails();
  }, [productId]);


  useEffect(() => {
    setProducts(data
      .sort((a: Product, b: Product) => a.age - b.age));
  }, [data]);

  const priceWithDiscount
    = (currentProduct && currentProduct.discount > 0
      ? currentProduct.price - ((currentProduct.price / 100) * currentProduct.discount)
      : currentProduct && currentProduct.price);

  useEffect(() => {
    setcurrentImg((currentProduct && currentProduct.imageUrl) || '');
  }, [currentProduct]);

  const changeMainImg = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLImageElement;

    setcurrentImg(target.src);
  };

  return (

    <>

      <div className="ProductDetailsPage">
        <BreadCrums />
        <GoBack />

        <p className="ProductDetailsPage__title">{details?.name}</p>
        <div className="ProductDetailsPage__wrapper">

          <div className="ProductDetailsPage__cell">
            <div className="ProductDetailsPage__images">
              <div className="ProductDetailsPage__list">
                {details && details.images.map(image => (
                  <button
                    className="ProductDetailsPage__images--item"
                    key={image}
                    type="button"
                    onClick={(event) => changeMainImg(event)}
                  >
                    <img
                      className="ProductDetailsPage__image"
                      src={image}
                      alt={details.name}
                    />
                  </button>
                ))}
              </div>

              <div className="ProductDetailsPage__mainImage">
                <img
                  src={currentImg}
                  alt={details && details.name}
                />
              </div>
            </div>
          </div>

          <div className="ProductDetailsPage__cell ProductDetailsPage__cell--info">


            <div className="price">

              <span className="price__withDiscount">
                {' '}
                $
                {priceWithDiscount}
              </span>
              {currentProduct?.discount !== 0 && (
                <span className="price__withoutDiscount">
                  {' '}
                  $
                  {currentProduct?.price}
                </span>
              )}
            </div>

            <div className="Button">
              <CartButton product={productId} />
              <FavoriteButton product={productId} />
            </div>

            <ProductInfo title="Screen" value={currentProduct && currentProduct?.screen} />
            <ProductInfo title="Ram" value={currentProduct && (currentProduct?.ram || 'No Info')} />
            <ProductInfo title="Capacity" value={currentProduct && (currentProduct?.capacity || 'No Info')} />
            <ProductInfo title="Battery" value={details && (details.battery?.type || 'No Info')} />

          </div>

          <div className="ProductDetailsPage__cell">
            <h3 className="ProductDetailsPage__cell--title">About</h3>
            <p className="ProductDetailsPage__cell--text">{details?.description}</p>
            <h3 className="ProductDetailsPage__cell--title">More info</h3>
            <p className="ProductDetailsPage__cell--text">{currentProduct?.snippet}</p>
          </div>

          <div className="ProductDetailsPage__cell">
            <h3 className="ProductDetailsPage__cell--title">Teck specks</h3>

            <ProductInfo title="OS" value={details && details.android?.os} />
            <ProductInfo title="Display" value={details && details.display.screenResolution} />
            <ProductInfo title="Weight" value={details && details.sizeAndWeight?.weight} />
            <ProductInfo title="Camera" value={details && (details.camera?.primary || 'No Info')} />
            <ProductInfo title="Storage" value={details && details.storage?.flash} />
            <ProductInfo title="WiFi" value={details && details.connectivity?.wifi} />

          </div>
        </div>
      </div>
      <ProductsSlider title="You may also like" visibleProducts={products} />
    </>
  );
};

export default ProductDetailsPage;
