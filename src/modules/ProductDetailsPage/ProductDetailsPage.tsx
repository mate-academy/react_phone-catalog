import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails, getSuggestedProducts } from '../../api/products';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import type { Product } from '../../types/Product';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    getProductDetails(productId)
      .then(found => {
        setProduct(found);
        if (found) {
          setImage(found.images[0]);
          setColor(found.color);
          setCapacity(found.capacity);
          getSuggestedProducts(found.category, productId).then(setSuggested);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setIsLoading(false));
  }, [productId]);
  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <section className="page">
        <p>Product was not found</p>
      </section>
    );
  }

  const imageUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <section className="page">
      <p className="breadcrumbs">
        <Link to="/">Home</Link> /{' '}
        <Link to={`/${product.category}`}>{product.category}</Link> /{' '}
        {product.name}
      </p>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{product.name}</h1>
      <div className="details">
        <div>
          <img
            className="main-image"
            src={imageUrl(image)}
            alt={product.name}
          />
          <div className="thumbnails">
            {product.images.map(src => (
              <button type="button" key={src} onClick={() => setImage(src)}>
                <img src={imageUrl(src)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Available colors</p>
          {product.colorsAvailable.map(value => (
            <label key={value}>
              <input
                type="radio"
                name="color"
                checked={color === value}
                onChange={() => setColor(value)}
              />
              {value}
            </label>
          ))}
          <p>Select capacity</p>
          {product.capacityAvailable.map(value => (
            <label key={value}>
              <input
                type="radio"
                name="capacity"
                checked={capacity === value}
                onChange={() => setCapacity(value)}
              />
              {value}
            </label>
          ))}
          <h2>
            ${product.priceDiscount} <del>${product.priceRegular}</del>
          </h2>
        </div>
      </div>
      <section>
        <h2>About</h2>
        {product.description.map(block => (
          <article key={block.title}>
            <h3>{block.title}</h3>
            {block.text.map(text => (
              <p key={text}>{text}</p>
            ))}
          </article>
        ))}
      </section>
      <section>
        <h2>Tech specs</h2>
        <p>Screen: {product.screen}</p>
        <p>Resolution: {product.resolution}</p>
        <p>Processor: {product.processor}</p>
        <p>RAM: {product.ram}</p>
      </section>
      {suggested.length > 0 && (
        <section>
          <h2>You may also like</h2>
          <ProductsList products={suggested} />
        </section>
      )}
    </section>
  );
};
