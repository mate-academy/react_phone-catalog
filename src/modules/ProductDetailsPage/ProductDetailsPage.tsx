import { FC, useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './ProductDetailsPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
// import type { ProductCard as ProductCardType } from '../shared/components/ProductCard';
import type { ProductCard as ProductCardType } from '../../services/api';

interface ProductDetail {
  id: string;
  namespaceId: string;
  name: string;
  category: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  color: string;
  capacity: string;
}

const colorMap: Record<string, string> = {
  black: '#212122',
  green: '#626d63',
  yellow: '#ffe681',
  white: '#f9f6f2',
  purple: '#d1cdda',
  red: '#ba0c2e',
  spacegray: '#535150',
  midnightgreen: '#4e5851',
  gold: '#f9e5c9',
  silver: '#ebebe3',
  rosegold: '#fad7de',
  coral: '#ff6f61',
  midnight: '#191970',
  spaceblack: '#2e2c2b',
  blue: '#437792',
  pink: '#faddd7',
  graphite: '#4b4b4b',
};

export const ProductDetailsPage: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [allProducts, setAllProducts] = useState<ProductDetail[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');

  const HomeIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.59087 0.807088C7.83161 0.619846 8.16872 0.619846 8.40946 0.807088L14.4095 5.47375C14.5718 5.60006 14.6668 5.79426 14.6668 5.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V5.99999C1.3335 5.79426 1.42848 5.60006 1.59087 5.47375L7.59087 0.807088ZM2.66683 6.32605V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V6.32605L8.00016 2.1779L2.66683 6.32605Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.3335 8.00001C5.3335 7.63182 5.63197 7.33334 6.00016 7.33334H10.0002C10.3684 7.33334 10.6668 7.63182 10.6668 8.00001V14.6667C10.6668 15.0349 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0349 9.3335 14.6667V8.66668H6.66683V14.6667C6.66683 15.0349 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0349 5.3335 14.6667V8.00001Z"
        fill="currentColor"
      />
    </svg>
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/phones.json');
        const data = await response.json();

        setAllProducts(data);

        const found = data.find((p: ProductDetail) => p.id === productId);

        if (found) {
          setProduct(found);
        }
      } catch (err) {
        // console.error('Fetch error:', err);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Функция для смены цвета
  const handleColorChange = (newColor: string) => {
    if (!product) {
      return;
    }

    // Ищем товар, у которого совпадает семейство и память, но другой цвет
    const targetProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === product.capacity &&
        p.color === newColor,
    );

    if (targetProduct) {
      // Переходим на страницу найденного товара
      navigate(`/product/${targetProduct.id}`);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  // Теперь product точно не null
  const categoryLabel =
    {
      phones: 'Phones',
      tablets: 'Tablets',
      accessories: 'Accessories',
    }[product.category] || product.category;

  const suggestedProducts: ProductCardType[] = allProducts
    .filter(p => p.id !== product.id)
    .map(p => ({
      id: p.id,
      itemId: p.id,
      name: p.name,

      price: p.priceDiscount,
      discount: p.priceRegular - p.priceDiscount,
      screen: p.screen,
      // fullPrice: p.priceRegular,
      capacity: p.capacity,
      ram: p.ram,
      rating: 4.5,
      reviewCount: 0,
      category: p.category as 'phones' | 'tablets' | 'accessories',
      image: p.images[0],
      color: p.color,
      isFavorite: false,
    }))
    // Можно перемешать массив, чтобы рекомендации были случайными
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  return (
    <main className={styles.page}>
      <Container>
        <Breadcrumbs
          items={[
            { link: '/', icon: HomeIcon },
            { label: categoryLabel, link: `/${product.category}` },
            { label: product.name },
          ]}
        />
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4717 3.52861C10.2114 3.26826 9.78927 3.26826 9.52892 3.52861L5.52892 7.52861C5.26857 7.78896 5.26857 8.21107 5.52892 8.47141L9.52892 12.4714C9.78927 12.7318 10.2114 12.7318 10.4717 12.4714C10.7321 12.2111 10.7321 11.789 10.4717 11.5286L6.94313 8.00001L10.4717 4.47141C10.7321 4.21107 10.7321 3.78896 10.4717 3.52861Z"
              fill="#313237"
            />
          </svg>
          Back
        </button>
        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.productContainer}>
          {/* Левая часть - картинки */}
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>

            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx}`}
                  className={selectedImage === idx ? styles.active : ''}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <div className={styles.infoWrapper}>
            <div className={styles.infoSection}>
              {/* Price */}

              {/* Colors */}
              {product.colorsAvailable.length > 0 && (
                <div className={styles.colors}>
                  <h3 className={styles.colorTitle}>Available colors</h3>
                  <div className={styles.colorList}>
                    {product.colorsAvailable.map(color => (
                      <button
                        key={color}
                        className={`${styles.colorButton} ${
                          product.color === color ? styles.active : ''
                        }`}
                        style={{
                          backgroundColor: colorMap[color] || color,
                          border:
                            product.color === color
                              ? '2px solid #313237'
                              : '1px solid #e2e6e9',
                        }}
                        title={color}
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Capacity */}
              {product.capacityAvailable.length > 0 && (
                <div className={styles.capacity}>
                  <h3>Select capacity</h3>
                  <div className={styles.capacityList}>
                    {product.capacityAvailable.map(cap => (
                      <button
                        key={cap}
                        className={`${styles.capacityButton} ${
                          selectedCapacity === cap ? styles.active : ''
                        }`}
                        onClick={() => setSelectedCapacity(cap)}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.priceSection}>
                <span className={styles.price}>${product.priceDiscount}</span>
                {product.priceRegular > product.priceDiscount && (
                  <span className={styles.oldPrice}>
                    ${product.priceRegular}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button className={styles.addToCart}>Add to cart</button>
                <button className={styles.addToFavorites}>♡</button>
              </div>
            </div>

            <div className={styles.specsListLeftBlock}>
              <div className={styles.specItemLeftBlock}>
                <span className={styles.specLabelLeftBlock}>Screen</span>
                <span className={styles.specValueLeftBlock}>
                  {product.screen}
                </span>
              </div>
              <div className={styles.specItemLeftBlock}>
                <span className={styles.specLabelLeftBlock}>Resolution</span>
                <span className={styles.specValueLeftBlock}>
                  {product.resolution}
                </span>
              </div>
              <div className={styles.specItemLeftBlock}>
                <span className={styles.specLabelLeftBlock}>Processor</span>
                <span className={styles.specValueLeftBlock}>
                  {product.processor}
                </span>
              </div>
              <div className={styles.specItemLeftBlock}>
                <span className={styles.specLabelLeftBlock}>RAM</span>
                <span className={styles.specValueLeftBlock}>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className={styles.descriptionSection}>
          {/* <h3 className={styles.descrTitle}>About</h3> */}
          {/* Description */}
          <div className={styles.descriptionWrap}>
            <div className={styles.descriptionWrap1}>
              <h3 className={styles.descrTitle}>About</h3>
              {product.description.map((section, idx) => (
                <div key={idx} className={styles.descriptionBlock}>
                  <h2>{section.title}</h2>
                  {section.text.map((paragraph, pIdx) => (
                    <p className={styles.descrP} key={pIdx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Tech Specs */}
            <div className={styles.techSpecs}>
              <h2>Tech specs</h2>
              <div className={styles.specsList}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Screen</span>
                  <span className={styles.specValue}>{product.screen}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Resolution</span>
                  <span className={styles.specValue}>{product.resolution}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Processor</span>
                  <span className={styles.specValue}>{product.processor}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>RAM</span>
                  <span className={styles.specValue}>{product.ram}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Built in memory</span>
                  <span className={styles.specValue}>{product.ram}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Camera</span>
                  <span className={styles.specValue}>{product.camera}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Zoom</span>
                  <span className={styles.specValue}>{product.zoom}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Cell</span>
                  <span className={styles.specValue}>
                    {product.cell.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
          showDiscount={false}
          classNameSection={styles.detailSection}
          titleClassName={styles.detailsSliderTitle}
          sliderWrapperClassName={styles.detailsSliderWrapper}
        />
      </Container>
    </main>
  );
};
