import { useNavigate, useParams } from 'react-router-dom';
import { useAppActions, useAppState } from '../store/store';
import type { Category } from '../types/category';
import type { Product } from '../types/Product';
import { useEffect, useMemo, useRef } from 'react';
import { ProductItemLayout } from '../components/templates/ProductItemLayout/ProductItemLayout';
import { ProductItemTopBar } from '../components/molecules/ProductItemTopBar/ProductItemTopBar';
import { PhotoGallery } from '../components/molecules/PhotoGallery/PhotoGallery';
import { ProductConfigurator } from '../components/organisms/ProductConfigurator/ProductConfigurator';
import { ProductAbout } from '../components/molecules/ProductAbout/ProductAbout';
import { PhoneTechSpecs } from '../components/organisms/PhoneTechSpecs/PhoneTechSpecs';
import { PhoneSpecsTable } from '../components/molecules/PhoneSpecsTable/PhoneSpecsTable';
import { ProductsCarousel } from '../components/organisms/Carousels/ProductsCarousel/ProductsCarousel';
import { shuffle } from '../utils/shuffle';
import { getLimitedProducts } from '../utils/limitedProducts';
import { useCarouselParams } from '../hooks/useCarouselParams';
import type { CarouselConfig } from '../types/carouselConfig';
import { useProductInfo } from '../hooks/useProductInfo';

type Props = {
  category: Category;
};

function getProducts(products: Product[], productId: string) {
  const splitId = productId.split('-');
  const sliceProductId = splitId.slice(0, splitId.length - 2).join('-');

  return getLimitedProducts(
    shuffle(
      products.filter((product) => {
        const splitProductId = product.id.split('-');
        const sliceCurrentProductId = splitProductId
          .slice(0, splitProductId.length - 2)
          .join('-');

        return sliceProductId !== sliceCurrentProductId;
      }),
    ) as Product[],
    true,
  );
}

const carouselConfig: CarouselConfig = {
  mobile: {
    slides: 1.3,
    height: 440,
  },
  tablet: {
    slides: 2.5,
    height: 512,
  },
  desktop: {
    slides: 4,
    height: 506,
  },
};

export const ProductItemPage: React.FC<Props> = ({ category }) => {
  const startCartAnimation = useAppState((state) => state.startCartAnimation);
  const galleryRef = useRef<HTMLImageElement>(null);
  const carouselParams = useCarouselParams(carouselConfig);
  const { setProductItem, addItemToCart, toggleFavorite, removeItemFromCart } =
    useAppActions();

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [productId]);

  const products = useAppState((state) => state[category]);

  useEffect(() => {
    if (products.length === 0) {
      return;
    }

    const product = products.find(
      (product: Product) => product.id === productId,
    );

    if (product) {
      setProductItem(product);
    } else {
      navigate('/*', { replace: true });
    }
  }, [productId, products, setProductItem, navigate]);

  const product = useAppState((state) => state.selectedProduct as Product);

  const shuffleProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return getProducts(products, product.id);
  }, [product, products]);

  const { isLiked, isSelected } = useProductInfo(product ? product.id : '');

  if (!product) {
    return <></>;
  }

  const handleCartClick = () => {
    if (isSelected) {
      removeItemFromCart(product.id);
      return;
    }

    addItemToCart(product);

    const imageElement = galleryRef.current;
    const cartElement = document.querySelector('[data-cart-target="true"]');

    if (!imageElement || !cartElement) {
      return;
    }

    const imageRect = imageElement.getBoundingClientRect();
    const cartRect = cartElement.getBoundingClientRect();

    startCartAnimation({
      imageSrc: imageElement.src,
      start: {
        x: imageRect.x,
        y: imageRect.y,
        width: imageRect.width,
        height: imageRect.height,
      },
      end: {
        x: cartRect.x,
        y: cartRect.y,
        width: cartRect.width,
        height: cartRect.height,
      },
      id: Date.now(),
    });
  };

  const handleColorSelect = (selectedValue: string) => {
    const newLink =
      products.find(
        (currentProduct) =>
          currentProduct.namespaceId === product.namespaceId &&
          currentProduct.color === selectedValue &&
          currentProduct.capacity === product.capacity,
      )?.id || '*';

    navigate(`/${product.category}/${newLink}`, { replace: true });
  };

  const handleCapacitySelect = (selectedValue: string) => {
    const newLink = productId
      ?.split('-')
      .map((part) => {
        if (part.toLowerCase() === product.capacity.toLowerCase()) {
          return selectedValue.toLowerCase();
        }

        return part;
      })
      .join('-');

    navigate(`/${product.category}/${newLink}`, { replace: true });
  };

  return (
    <ProductItemLayout
      pageProductDetails={<ProductItemTopBar title={product.name} />}
      productGallery={
        <PhotoGallery
          imageRef={galleryRef}
          product={product}
          key={product.id}
        />
      }
      productConfigurator={
        <ProductConfigurator
          product={product}
          handleColorSelect={handleColorSelect}
          handleCapacitySelect={handleCapacitySelect}
          handleAddToCart={handleCartClick}
          handleLikeClick={() => toggleFavorite(product)}
          isLiked={isLiked}
          isSelected={isSelected}
        />
      }
      productAbout={<ProductAbout description={product.description} />}
      techSpecs={
        <PhoneTechSpecs>
          <PhoneSpecsTable specs={product} />
        </PhoneTechSpecs>
      }
      productsCarousel={
        <ProductsCarousel
          title="You may also like"
          products={shuffleProducts}
          productCardHeight={carouselParams.height}
          displayedSlides={carouselParams.slides}
        />
      }
    />
  );
};
