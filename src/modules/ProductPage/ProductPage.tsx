import { useEffect, useState, useCallback } from 'react';
import { Breadcrumbs } from '../Shared/Breadcrumbs/Breadcrumbs';
import { PhonesTitle } from '../Shared/PhonesTitle/Phones-title';
import { Product } from './Product/Product';
import { ProductDescription } from './ProductDescription/Product-description';
import { useLocation, useParams } from 'react-router-dom';
import { HotPrices } from '../HomePage/HotPrices/Hot-prices';
import { Loading } from '../Shared/Loading/Loading';
import { ErrorPage } from '../Shared/ErrorPage/ErrorPage';
import style from './ProductPage.module.scss';
import { Phone } from '../../Types/type';

interface ProductPageProps {
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favouriteButton: Set<string>;
  itemsInCart: Phone[];
}

export const ProductPage = ({
  toggleInCart,
  toggleFavourite,
  favouriteButton,
  itemsInCart,
}: ProductPageProps) => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();

  // 💡 НОВІ СТАНИ: Зберігаємо всі завантажені продукти та поточний обраний варіант
  const [allProducts, setAllProducts] = useState<Phone[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Phone | null>(null);

  // СТАНИ ДЛЯ ВІДОБРАЖЕННЯ (частина логіки перенесена сюди)
  const [productImages, setProductImages] = useState<string[]>([]);
  const [image, setImage] = useState<string | undefined>();
  const [colors, setColors] = useState<string[]>([]);
  const [capacityAvailable, setCapacityAvailable] = useState<string[]>([]); // Доступні об'єми
  const [currentCapacity, setCurrentCapacity] = useState<string>(''); // Активний об'єм
  const [productPrice, setProductPrice] = useState<number | undefined>();
  const [productDiscount, setProductDiscount] = useState<number | undefined>();

  // СТАНИ ДЛЯ УПРАВЛІННЯ СТОРІНКОЮ
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const initializeProductData = (product: Phone) => {
    setCurrentProduct(product);
    setProductImages(product.images);
    setImage(product.images[0]);
    setColors(product.colorsAvailable);
    setCapacityAvailable(product.capacityAvailable);
    setCurrentCapacity(product.capacity);
    setProductPrice(product.priceRegular);
    setProductDiscount(product.priceDiscount);
    setError(false);
    setProductNotFound(false);
  };

  // 2. Функція для завантаження всіх продуктів
  const loadAllProducts = useCallback(async () => {
    if (!productId) {
      setLoading(false);

      return;
    }

    setLoading(true);
    setError(false);
    setProductNotFound(false);

    let url = '';

    if (location.pathname.includes('/phones')) {
      url = './api/phones.json';
    } else if (location.pathname.includes('/tablets')) {
      url = './api/tablets.json';
    } else if (location.pathname.includes('/accessories')) {
      url = './api/accessories.json';
    }

    if (url) {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data: Phone[] = await response.json();

        setAllProducts(data); // Зберігаємо весь список

        // Знаходимо продукт на основі URL (з надійним порівнянням)
        const normalizedProductId = productId.trim().toLowerCase();
        const product = data.find(
          (item: Phone) => item.id.trim().toLowerCase() === normalizedProductId,
        );

        if (product) {
          initializeProductData(product);
        } else {
          setProductNotFound(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [productId, location.pathname]);

  // 3. Функція зміни обсягу пам'яті (capacity)
  const findPriceByCapacity = (selectedCapacity: string) => {
    if (!currentProduct || allProducts.length === 0) {
      return;
    }

    const normalizedSelectedCapacity = selectedCapacity.trim().toLowerCase();

    // Шукаємо варіант продукту з новим capacity
    const productCapacity = allProducts.find(
      item =>
        item.namespaceId === currentProduct.namespaceId &&
        item.capacity.trim().toLowerCase() === normalizedSelectedCapacity &&
        item.color === currentProduct.color,
    );

    if (productCapacity) {
      // 💡 ОНОВЛЮЄМО СТАН БЕЗ ПЕРЕЗАВАНТАЖЕННЯ СТОРІНКИ
      setCurrentProduct(productCapacity);
      setProductPrice(productCapacity.priceRegular);
      setProductDiscount(productCapacity.priceDiscount);
      setCurrentCapacity(productCapacity.capacity);

      // 💡 ОНОВЛЮЄМО URL БЕЗ ПЕРЕЗАВАНТАЖЕННЯ (якщо ви хочете міняти URL при зміні capacity)
      // ВАЖЛИВО: Для цього потрібен useHistory, або useNavigate (якщо v6),
      // але залишаю цю логіку в ProductPage для демонстрації
    }
  };

  // 4. Функція зміни кольору (колір змінює URL, тому використовуємо Link у Product.tsx)
  const findColor = (selectedColor: string) => {
    // Ця функція більше не потрібна тут, оскільки зміна кольору відбувається
    // через навігацію <Link> у Product.tsx, що змінює productId і запускає loadAllProducts.
    // Але якщо ви хочете реалізувати зміну кольору без зміни URL, логіка тут була б аналогічна findPriceByCapacity.
  };

  const mainImage = (selectedImage: string) => {
    setImage(selectedImage);
  };

  // --- USE EFFECT ---

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  // --- РЕНДЕР ---

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage onReload={loadAllProducts} />;
  }

  if (productNotFound || !currentProduct) {
    return (
      <div className={style.notfound}>
        <img
          className={style.notfound__image}
          src="./img/product-not-found.png"
          alt="Not found"
        />
        <p className={style.notfound__text}>Product not found</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Product
        // 💡 ТЕПЕР ПЕРЕДАЄМО ВСІ ДАНІ ЗІ СТАНУ productPage
        currentProduct={currentProduct}
        productScreen={currentProduct.screen}
        productRam={currentProduct.ram}
        productProcessor={currentProduct.processor}
        productResolution={currentProduct.resolution}
        // Дані, що динамічно змінюються
        productImages={productImages}
        productImage={image}
        colors={colors}
        capacity={capacityAvailable} // Передаємо доступні capacity
        currentCapacity={currentCapacity} // Передаємо активний capacity
        productPrice={productPrice!}
        productDiscount={productDiscount!}
        // Функції для взаємодії
        mainImage={mainImage}
        findPriceByCapacity={findPriceByCapacity}
        // Кошик/Обране
        toggleInCart={toggleInCart}
        toggleFavourite={toggleFavourite}
        favouriteButton={favouriteButton}
        itemsInCart={itemsInCart}
      />
      <ProductDescription
        productScreen={currentProduct.screen}
        productRam={currentProduct.ram}
        productProcessor={currentProduct.processor}
        capacity={capacityAvailable}
        productResolution={currentProduct.resolution}
        // ... ви можете додати більше пропсів тут, використовуючи currentProduct
      />
      <HotPrices
        favouriteButton={favouriteButton}
        toggleInCart={toggleInCart}
        toggleFavourite={toggleFavourite}
        itemsInCart={itemsInCart}
      />
    </>
  );
};
