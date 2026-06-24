/* eslint-disable import/extensions */
import styles from './ProductDetailsPage.module.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FullProduct } from '../types/Alltypes';
import { useEffect, useState } from 'react';
import { getData } from '../fetch/httpClient';

export const ProductDetailsPage = () => {
  const { slug: productId, category } = useParams<{
    slug: string;
    category: string;
  }>();

  const [products, setProducts] = useState<FullProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedImages, setSelectedImages] = useState('');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setLoading(true);
    getData<FullProduct[]>(`/api/${category}.json`)
      .then(data => {
        const product = data.find(item => item.id === productId);

        setProducts(product || null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [category, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error} <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!products) {
    return <div>Product not found</div>;
  }

  const {
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    cell,
    zoom,
  } = products;

  return (
    <div className={styles.containerPhones}>
      <Link to={`/${category}/${productId}`} className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <span className={styles.homeGo}>{'>'}</span>
          <span className={styles.homeGoTo}>{category}</span>
        </button>
      </Link>
      <button className={styles.backButton}>
        <img src="/img/left.svg" alt="back" className={styles.backImg} />
        <span>Back</span>
      </button>
      <h2 className={styles.linkId}>
        <Link to={`/${category}/${productId}`} className={styles.linkId}>
          {products.name}
        </Link>
      </h2>

      <div className={styles.images}>
        {products.images.map(img => (
          <button
            key={img}
            name="img"
            value={img}
            onChange={() => setSelectedImages(img)}
          >
            <img src={`/category/${img}`} alt="img" />
          </button>
        ))}
      </div>

      <div className={styles.colorsAvailableBlock}>
        {products.colorsAvailable.map(color => (
          <label key={color}>
            <input
              type="radio"
              name="color"
              value={color}
              checked={selectedColor === color}
              onChange={() => setSelectedColor(color)}
            />
            {color}
          </label>
        ))}
      </div>
      <div className={styles.capacityAvailableBlock}>
        {products.capacityAvailable.map(cap => (
          <label key={cap}>
            <input
              type="radio"
              name="capacity"
              value={cap}
              checked={selectedCapacity === cap}
              onChange={() => setSelectedCapacity(cap)}
            />
            {cap}
          </label>
        ))}
      </div>

      <div className={styles.cardPriceGoup}>
        <span className={styles.cardPriceHot}>${priceDiscount}</span>
        <span className={styles.cardfullPriceHot}>${priceRegular}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.cardToAdd}>Add to cart</button>
        <button className={styles.buttonToFavorites}>
          <img
            src="/img/favorites.svg"
            className={styles.iconImgFavorites}
            alt="Favourites"
          />
        </button>
      </div>
      <div className={styles.cardSpes}>
        <div className={styles.screen}>
          <span>Screen</span>
          <strong className={styles.strong}>{screen}</strong>
        </div>

        <div className={styles.resolution}>
          <span>Resolution</span>
          <strong className={styles.strong}>{resolution}</strong>
        </div>

        <div className={styles.processor}>
          <span>Processor</span>
          <strong className={styles.strong}>{processor}</strong>
        </div>

        <div className={styles.ram}>
          <span>Ram</span>
          <strong className={styles.strong}>{ram}</strong>
        </div>
      </div>

      <div className={styles.about}>
        <h3>About</h3>
        <div className={styles.aboutDescription}>
          {products.description.map((des, index) => (
            <div key={index}>
              <strong className={styles.aboutTitle}>{des.title} </strong>
              <span className={styles.aboutText}>{des.text} </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.TechSpecs}>
        <span>Tech specs</span>
        <div className={styles.screen}>
          <span>Screen</span>
          <strong className={styles.strong}>{screen}</strong>
        </div>

        <div className={styles.resolution}>
          <span>Resolution</span>
          <strong className={styles.strong}>{resolution}</strong>
        </div>

        <div className={styles.processor}>
          <span>Processor</span>
          <strong className={styles.strong}>{processor}</strong>
        </div>

        <div className={styles.ram}>
          <span>Ram</span>
          <strong className={styles.strong}>{ram}</strong>
        </div>

        <div className={styles.camera}>
          <span>Camera</span>
          <strong className={styles.strong}>{camera}</strong>
        </div>

        <div className={styles.zoom}>
          <span>Zoom</span>
          <strong className={styles.strong}>{zoom}</strong>
        </div>

        <div className={styles.cell}>
          <span>Cell</span>
          <strong className={styles.strong}>{cell}</strong>
        </div>
      </div>
    </div>
  );
};
