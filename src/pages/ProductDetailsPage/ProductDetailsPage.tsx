import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../state/state';
import { getProductById } from '../../api/api';
import { ProductDetails } from '../../types';
import { BackButton, Breadcrumbs, Loader } from '../../components';
import {
  ProductAbout,
  ProductActions,
  ProductCapacity,
  ProductColors,
  ProductPhotos,
  ProductPrice,
  ProductSpecsFull,
  ProductSpecsMain,
  YouMayLike,
} from './components';
import './ProductDetailsPage.scss';
import { useLoadProducts } from '../../hooks/useLoadProducts';
import { AppRoute } from '../../enums';

type Params = {
  productId: string;
};

export const ProductDetailsPage: React.FC = () => {
  const { state } = useStateContext();

  const { productId } = useParams<Params>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
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
  const isFavourite = state.favourites.find(
    fav => fav.itemId === product?.itemId,
  );

  useLoadProducts();
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
      setError('Product not found');
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

    const newProductId = `${productDetails.namespaceId}-${selectedCapacity}-${color.replace(/\s+/g, '-')}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  const handleCapacityChange = async (capacity: string) => {
    if (!productDetails) {
      return;
    }

    const newProductId = `${productDetails.namespaceId}-${capacity}-${selectedColor?.replace(/\s+/g, '-').toLowerCase()}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  if (loading && initialLoad) {
    return <Loader />;
  }

  if (error) {
    if (error === 'Category is missing') {
      navigate(AppRoute.NOT_FOUND);

      return null;
    } else if (error === 'Product not found') {
      return (
        <div className="product-not-found">
          <h3 className="product-not-found__title typography__h3">
            Product not found
          </h3>
          <div className="product-not-found__image-wrapper">
            <img
              className="product-not-found__image"
              src="img/product-not-found.png"
              alt="Product not found"
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
      <div className="product-not-found">
        <p>Product not found</p>
        <img src="img/product-not-found.png" alt="Product not found" />
      </div>
    );
  }

  return (
    <>
      <div className="product-details">
        <Breadcrumbs
          productName={productDetails.name}
          className="product-details__breadcrumbs"
        />
        <BackButton className="product-details__back-button" />
        <h1 className="product-details__title typography__h2">
          {productDetails.name}
        </h1>

        <div className="product-details__main">
          <ProductPhotos
            productDetails={productDetails}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
          <div className="product-details__info">
            <ProductColors
              product={product}
              productDetails={productDetails}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
            <ProductCapacity
              productDetails={productDetails}
              onCapacityChange={handleCapacityChange}
            />
            <ProductPrice productDetails={productDetails} />
            <ProductActions
              product={product}
              isInCart={isInCart}
              isFavourite={isFavourite}
            />
            <ProductSpecsMain productDetails={productDetails} />
          </div>
        </div>
        <div className="product-details__additional">
          <ProductAbout productDetails={productDetails} />
          <ProductSpecsFull productDetails={productDetails} />
        </div>
      </div>
      <YouMayLike className="product-details__you-may-like" />
    </>
  );
};
