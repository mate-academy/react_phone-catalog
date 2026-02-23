import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import styles from './ProductPage.module.scss';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductSlider } from '../../../components/ProductSlider';
import { WishlistButton } from '../../../components/WishlistButton';
import { useProducts } from '../../../hooks/use-products';
import { Loader } from '../../../components/Loader';

// TODO: fetch real product by useParams() category + productId
const PRODUCT = {
  category: 'phones',
  categoryLabel: 'Phones',
  name: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
  images: [
    'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    'img/phones/apple-iphone-11-pro-max/gold/01.webp',
    'img/phones/apple-iphone-11-pro-max/gold/02.webp',
    'img/phones/apple-iphone-11-pro-max/spacegray/00.webp',
  ],
  price: 799,
  fullPrice: 1099,
  colors: [
    { name: 'gold', hex: '#C9A84C' },
    { name: 'spacegray', hex: '#4A4A4A' },
    { name: 'silver', hex: '#C0C0C0' },
    { name: 'midnightgreen', hex: '#4B5F5A' },
  ],
  capacities: ['64 GB', '128 GB', '256 GB'],
  screen: "6.5' OLED",
  resolution: '2688 × 1242',
  processor: 'Apple A13 Bionic',
  ram: '4 GB',
  about: [
    {
      title: 'And then there was Pro',
      text: 'A transformative triple-camera system that adds tons of\
       capability without any sacrifice. Night mode, Portrait mode,\
        and next-generation Smart HDR. The most advanced chip ever \
        in a smartphone.All of these features in the most durable \
        smartphone glass ever, in two new colours.',
    },
    {
      title: 'Camera',
      text: "Meet the first triple-camera system to combine four optical\
       image stabilisation systems in one iPhone. Capture up to four times\
        more scene. Get beautiful images in drastically lower light. Shoot\
         the highest-quality video in a smartphone — then edit with the same\
          tools you love for photos. You've never shot with anything like it.",
    },
    {
      title:
        'Shoot it. Flip it. Zoom it. Crop it. Cut it. \
        Light it. Tweak it. Love it.',
      text: "iPhone 11 Pro lets you capture videos and photos \
      with beautiful bokeh and Target Depth Control. Get more creative \
      with powerful new editing tools in the Photos app. And at 4K 60 fps,\
       it's the highest quality video in a smartphone.",
    },
  ],
  techSpecs: {
    Screen: "6.5' OLED",
    Resolution: '2688 × 1242',
    Processor: 'Apple A13 Bionic',
    RAM: '4 GB',
    'Built in memory': '64 GB',
    Camera: '12 Mp + 12 Mp + 12 Mp (ToF)',
    Zoom: 'Optical, 2x + Digital, 10x',
    Cell: 'GSM, LTE, UMTS',
  },
};

const RELATED = [
  {
    id: 1,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-128gb-gold',
    image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Gold (iMT9G2FS/A)',
    price: 999,
    fullPrice: 1199,
    screen: "6.1' OLED",
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 2,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-256gb-gold',
    image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    name: 'Apple iPhone 11 Pro Max 256GB Gold (iMT9G2FS/A)',
    price: 799,
    fullPrice: 1199,
    screen: "6.5' OLED",
    capacity: '256 GB',
    ram: '4 GB',
  },
  {
    id: 3,
    category: 'phones',
    itemId: 'apple-iphone-11-128gb-purple',
    image: 'img/phones/apple-iphone-11/purple/00.webp',
    name: 'Apple iPhone 11 128GB Purple',
    price: 729,
    fullPrice: 867,
    screen: "6.2' IPS",
    capacity: '128 GB',
    ram: '4 GB',
  },
  {
    id: 4,
    category: 'phones',
    itemId: 'apple-iphone-xs-256gb-silver',
    image: 'img/phones/apple-iphone-xs/silver/00.webp',
    name: 'Apple iPhone XS 256GB Silver (iMT9G2FS/A)',
    price: 859,
    fullPrice: 899,
    screen: "5.8' OLED",
    capacity: '256 GB',
    ram: '4 GB',
  },
];

export const ProductPage = () => {
  const { products, loading, error } = useProducts;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // TODO: replace with useParams and fetch
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0].name);
  const [selectedCapacity, setSelectedCapacity] = useState(
    PRODUCT.capacities[0],
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: PRODUCT.categoryLabel, to: `/${PRODUCT.category}` },
          { label: PRODUCT.name },
        ]}
      />

      <Link to={`/${PRODUCT.category}`} className={styles.back}>
        <i className="fas fa-chevron-left" />
        Back
      </Link>

      <h1 className={styles.title}>{PRODUCT.name}</h1>

      <div className={styles.product}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {PRODUCT.images.map((img, i) => (
              <button
                key={img}
                type="button"
                className={cn(styles.thumbnail, {
                  [styles.thumbnailActive]: i === selectedImage,
                })}
                onClick={() => setSelectedImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt={`${PRODUCT.name} view ${i + 1}`} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img src={PRODUCT.images[selectedImage]} alt={PRODUCT.name} />
          </div>
        </div>

        {/* Info panel */}
        <div className={styles.info}>
          <div className={styles.infoSection}>
            <p className={styles.infoLabel}>Available colors</p>
            <div className={styles.colors}>
              {PRODUCT.colors.map(color => (
                <button
                  key={color.name}
                  type="button"
                  className={cn(styles.colorBtn, {
                    [styles.colorBtnActive]: color.name === selectedColor,
                  })}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                >
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoSection}>
            <p className={styles.infoLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {PRODUCT.capacities.map(cap => (
                <button
                  key={cap}
                  type="button"
                  className={cn(styles.capacityBtn, {
                    [styles.capacityBtnActive]: cap === selectedCapacity,
                  })}
                  onClick={() => setSelectedCapacity(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.price}>${PRODUCT.price}</span>
            <span className={styles.fullPrice}>${PRODUCT.fullPrice}</span>
          </div>

          <div className={styles.ctaRow}>
            <button type="button" className={styles.addToCart}>
              Add to cart
            </button>
            <WishlistButton />
          </div>

          <ul className={styles.shortSpecs}>
            {(
              [
                ['Screen', PRODUCT.screen],
                ['Resolution', PRODUCT.resolution],
                ['Processor', PRODUCT.processor],
                ['RAM', PRODUCT.ram],
              ] as [string, string][]
            ).map(([label, value]) => (
              <li key={label} className={styles.shortSpecRow}>
                <span className={styles.shortSpecLabel}>{label}</span>
                <span className={styles.shortSpecValue}>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* About + Tech specs */}
      <div className={styles.details}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <hr className={styles.sectionDivider} />
          {PRODUCT.about.map(section => (
            <div key={section.title} className={styles.aboutSection}>
              <h3 className={styles.aboutTitle}>{section.title}</h3>
              <p className={styles.aboutText}>{section.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <hr className={styles.sectionDivider} />
          <ul className={styles.specsList}>
            {Object.entries(PRODUCT.techSpecs).map(([key, val]) => (
              <li key={key} className={styles.techSpecRow}>
                <span className={styles.techSpecLabel}>{key}</span>
                <span className={styles.techSpecValue}>{val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProductSlider title="You may also like" products={RELATED} />
    </>
  );
};
