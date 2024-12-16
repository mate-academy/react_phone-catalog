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
} from './components';
import './ProductDetailsPage.scss';

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      setError('Product ID is missing');
      setLoading(false);

      return;
    }

    const productCategory = state.products.find(item => {
      return item.itemId === productId;
    })?.category;

    if (!productCategory) {
      setError('Category is missing');
      setLoading(false);

      return;
    }

    const loadProduct = async () => {
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
        setLoading(false);
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  return (
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
  );
};
