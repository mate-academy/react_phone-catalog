import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../state/state';
import { useLoadProducts } from '../../components/hooks/useLoadProducts';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { getProductById } from '../../api/serviceApi';
import style from './ProductDetailPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

import { ProductPhotos } from '../../components/ProductPhotos/ProductPhotos';
import { BackButton } from '../../components/BackButton/BackButton';
import { ProductColors } from '../../components/ProductColors/ProductColors';

import { ProductPrice } from '../../components/ProductPrice/ProductPrice';
import { ProductActions } from '../../components/ProductActions/ProductActions';

import { ProductAbout } from '../../components/ProductAbout/ProductAbout';

import { YouMayLike } from '../../components/YouMayLike/YouMayLike';
import { Loader } from '../../components/Loader/Loader';
import { ProductCapacity } from '../../components/ProductCapacity';
import { ProductsSpecMain } from '../../components/ProductsSpecMain';
import { ProductsSpecFull } from '../../components/ProductsSpecFull';

type Params = {
  productId: string;
};

export const ProductDetailPage: React.FC = () => {
  const { state } = useStateContext();
  const loadProducts = useLoadProducts();
  const { productId } = useParams<Params>();

  const [productDetails, setProductDetails] =
    useState<ProductDetailsType | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const product = state.products.find(item => item.itemId === productId);

  const isInCart = state.cart.find(item => {
    return item.itemId === product?.itemId;
  });

  const isFavourite = state.favourites.find(fav => {
    return fav.itemId === product?.itemId;
  });

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      setError('Product ID is missing');
      setLoading(false);

      return;
    }

    if (state.products.length === 0) {
      setLoading(true);

      return;
    }

    const targetProduct = state.products.find(item => {
      return item.itemId === productId;
    });

    if (!targetProduct) {
      setError('Product not found!');
      setLoading(false);

      return;
    }

    const productCategory = targetProduct?.category;

    if (!productCategory) {
      setError('Category is missing');
      setLoading(false);

      return;
    }

    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(productId, productCategory);

        setProductDetails(data);
        setSelectedImage(data.images[0]);
        setSelectedColor(data.color);
        setSelectedCapacity(data.capacity.toLowerCase());
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
          setInitialLoad(false);
        }, 500);
      }
    };

    loadProduct();
  }, [state.products, productId]);

  const handleColorChange = async (color: string) => {
    if (!productDetails) {
      return;
    }

    const newProductId = `${productDetails?.namespaceId}-${selectedCapacity}-${color.replace(/\s+/g, '-')}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  const handleCapacityChange = async (capacity: string) => {
    if (!productDetails) {
      return;
    }

    const newProductId = `${productDetails.namespaceId}-${capacity.toLowerCase()}-${selectedColor?.replace(/\s+/g, '-').toLowerCase()}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  if (loading && initialLoad) {
    return <Loader />;
  }

  if (error) {
    if (error === 'Category is missing') {
      navigate('*');

      return null;
    } else if (error === 'Product not found!') {
      return (
        <div className={style.product_not_found}>
          <h3 className={style.product_not_found__title}>Product not found</h3>
          <div className={style.product_not_found__imagem_wrapper}>
            <img
              src="/img/product-not-found.png"
              alt="Product not found"
              className={style.product_not_found__imagem}
            />
          </div>
        </div>
      );
    } else {
      return <div>Error: {error}</div>;
    }
  }

  if (!productDetails) {
    return (
      <div className={style.product_not_found}>
        <p>Product not found</p>
        <img
          src="/img/product-not-found.png"
          alt="Product not found"
          className={style.product_not_found__imagem}
        />
      </div>
    );
  }

  return (
    <>
      <div className={style.product_details}>
        <BreadCrumbs
          productName={productDetails.name}
          className={style.product_details__breadCrumbs}
        />
        <BackButton className={style.product_details__back_button} />
        <h1 className={style.product_details__title}>{productDetails.name}</h1>

        <div className={style.product_details__main}>
          <ProductPhotos
            onImageSelect={setSelectedImage}
            productDetails={productDetails}
            selectedImage={selectedImage}
          />
        </div>

        <div className={style.product_details__info}>
          <ProductColors
            onColorChange={handleColorChange}
            selectedColor={selectedColor}
            productDetails={productDetails}
            product={product}
          />

          <ProductCapacity
            productDetails={productDetails}
            onCapacityChange={handleCapacityChange}
          />
          <ProductPrice productDetails={productDetails} />
          <ProductActions
            isFavourite={isFavourite}
            isInCart={isInCart}
            product={product}
          />
          <ProductsSpecMain productDetails={productDetails} />
        </div>
        <div className={style.product_details__additional}>
          <ProductAbout productDetails={productDetails} />
          <ProductsSpecFull productDetails={productDetails} />
        </div>
      </div>
      <YouMayLike className={style.product_details__you_may_like} />
    </>
  );
};
