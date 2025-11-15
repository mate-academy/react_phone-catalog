import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getProduct } from '../shared/utils/fetchClient';
import { useCart } from '../shared/context/CartContext';
import { useProducts } from '../shared/context/ProductsContext';
import { useFavorites } from '../shared/context/FavoritesContext';

import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import { Back } from '../shared/components/Back';
import { ProductInfo } from './components/ProductInfo';
import { ProductMainInfo } from './components/ProductMainInfo';
import { Loader } from '../shared/components/Loader';
import { PageState } from '../shared/components/PageState';
import { NotFound } from '../shared/components/NotFound';

import { Phone } from '../shared/types/Phone';
import { Product } from '../shared/types/Product';
import { ColorName } from '../shared/types/colors';

import styles from './ProductDetailsPage.module.scss';

type Props = {
  category: string;
};

export const ProductDetailsPage: FC<Props> = ({ category }) => {
  const { itemId } = useParams();
  const { products: allProducts, error: detailsError } = useProducts();

  const [products, setProducts] = useState<Phone[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorName | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const [currentProduct, setCurrentProduct] = useState<Phone | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { toggleCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const currentProductAsProduct = allProducts.find(
    p => p.itemId === currentProduct?.id,
  );

  const inCart = cart.some(p => p.itemId === currentProductAsProduct?.itemId);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const data: Phone[] = await getProduct(`/${category}.json`);

        setProducts(data);
      } catch (e) {
        setProducts([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === itemId) ?? null;

      setCurrentProduct(found);
    }
  }, [itemId, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  useEffect(() => {
    if (currentProduct) {
      const imageIndex = location.state?.imageIndex ?? 0;

      if (currentProduct.images[imageIndex]) {
        setSelectedImage(currentProduct.images[imageIndex]);
      } else {
        setSelectedImage(currentProduct.images[0]);
      }

      setSelectedColor(currentProduct.color as ColorName);
      setSelectedCapacity(currentProduct.capacity);

      const sameCategory = allProducts.filter(
        p =>
          p.category === currentProduct.category &&
          p.itemId !== currentProduct.id,
      );

      const shuffled = [...sameCategory].sort(() => Math.random() - 0.5);

      setSuggested(shuffled.slice(0, 6));
    }
  }, [currentProduct, allProducts, location.state?.imageIndex]);

  const handleVariantChange = (
    updates: Partial<{ color: string; capacity: string }>,
  ) => {
    if (!currentProduct) {
      return;
    }

    const newProduct = products.find(
      p =>
        p.namespaceId === currentProduct.namespaceId &&
        (updates.color ?? selectedColor) === p.color &&
        (updates.capacity ?? selectedCapacity) === p.capacity,
    );

    if (newProduct) {
      const imageIndex = currentProduct.images.findIndex(
        img => img === selectedImage,
      );

      navigate(`/${category}/${newProduct.id}`, {
        state: { imageIndex },
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <PageState type="error" message="Something went wrong" />;
  }

  if (!currentProduct) {
    return (
      <NotFound
        title="Product was not found"
        imageSrc="./img/product-not-found.png"
        alt="Product was not found"
      />
    );
  }

  return (
    <section className={styles['product-details']}>
      <div className={styles['product-details__wrapper']}>
        <Breadcrumbs firstPath="Phones" secondPath={currentProduct?.name} />

        <Back />

        <h2 className={styles['product-details__title']}>
          {currentProduct?.name}
        </h2>

        <div className={styles['product-details__main']}>
          <ProductMainInfo
            product={currentProduct}
            currentProductAsProduct={currentProductAsProduct}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectedColor={selectedColor}
            selectedCapacity={selectedCapacity}
            handleVariantChange={handleVariantChange}
            inCart={inCart}
            toggleCart={toggleCart}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />

          <ProductInfo currentProduct={currentProduct} />

          {suggested.length > 0 && !detailsError && (
            <ProductSlider products={suggested} header="You may also like" />
          )}
        </div>
      </div>
    </section>
  );
};
