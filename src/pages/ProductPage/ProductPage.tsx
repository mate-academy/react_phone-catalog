import { BreadCrumbs } from '../../components/BreadCrumbs';
import styles from './ProductPage.styles.module.scss';
import ArrowLeft from '../../assets/icons/VectorLeft.svg?react';
import { ProductSlider } from '../../modules/ProductSlider';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Products';
import { Phone } from '../../types/Phone';
import { About } from './components/About';
import { TechSpecs } from './components/TechSpecs';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { Gallery } from './components/Gallery/Gallery';
import { shuffleArray } from '../../utils/shuffleArray/shuffleArray';
import { Loader } from '../../components/Loader';

type Category = 'phones' | 'tablets' | 'accessories';

export const ProductPage = () => {
  const [product, setProduct] = useState<Phone | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cardProduct, setCardProduct] = useState<Product | null>(null);

  const { productId } = useParams();

  const navigate = useNavigate();

  const categoryTitles: Record<Category, string> = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (!productId) {
      return;
    }

    setSelectedImage(0);
    setIsLoading(true);

    fetch(`${import.meta.env.BASE_URL}/api/products.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((allProducts: Product[]) => {
        setProducts(allProducts);

        const shortProduct = allProducts.find(
          item => item.itemId === productId,
        );

        if (!shortProduct) {
          throw new Error('Product not found');
        }

        setProducts(allProducts);
        setCardProduct(shortProduct);
        setCategory(shortProduct.category as Category);

        return fetch(
          `${import.meta.env.BASE_URL}/api/${shortProduct.category}.json`,
        );
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load product details');
        }

        return response.json();
      })
      .then((details: Phone[]) => {
        const foundProduct = details.find(item => item.id === productId);

        setProduct(foundProduct ?? null);
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  const recommendedProducts = products.filter(
    item => item.itemId !== productId,
  );

  const getSuggestedProducts = shuffleArray(recommendedProducts).slice(0, 10);

  return (
    <section className={styles.productPage}>
      {isLoading && <Loader />}

      {!isLoading && !product && <p>Product not found</p>}

      {!isLoading && product && (
        <>
          {category && (
            <BreadCrumbs
              items={[
                { title: categoryTitles[category], path: `/${category}` },
                { title: product.name },
              ]}
            />
          )}
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            <ArrowLeft />
            <span>Back</span>
          </button>

          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.productInfo}>
            <Gallery
              images={product.images}
              productName={product.name}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
            />
            {cardProduct && (
              <ProductDetails product={product} cardProduct={cardProduct} />
            )}
          </div>

          <div className={styles.bottom}>
            <About description={product.description} />
            <TechSpecs product={product} />
          </div>

          <ProductSlider
            title="You may also like"
            products={getSuggestedProducts}
          />
        </>
      )}
    </section>
  );
};
