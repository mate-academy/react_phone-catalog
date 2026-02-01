import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Product, ProductDetails } from '../../types/Product';
import { client } from '../../client';
import { Loader } from '../../components/Loader';
import style from './ProductDetailsPage.module.scss';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductBuySection } from './components/ProductBuySection';
import { ProductCapacity } from './components/ProductCapasity';
import { ProductColors } from './components/ProductColors';
import { ProductTachSpect } from './components/ProductTechSpect';

export const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();

  // стан для основного стану
  const [data, setData] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  // стан для рекомендованих товарів
  const [suggested, setSuggested] = useState<Product[] | null>(null);

  const [selectedImg, setSelectedImg] = useState(0);
  const [color, setColor] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<string | null>(null);

  const updateProduct = async (
    newColor: string | null = color,
    newCapacity: string | null = capacity,
  ) => {
    if (!data) {
      return;
    }

    const normalizedColor = newColor?.replace(' ', '-').toLowerCase();
    const normalizedCapacity = newCapacity?.toLowerCase();

    const newId = `${data.namespaceId}-${normalizedCapacity}-${normalizedColor}`;
    const newProduct = await client.getProductDeatils(newId);

    setColor(newColor);
    setData(newProduct);
    setCapacity(newCapacity);
  };

  const handleColorChange = (newColor: string) => {
    updateProduct(newColor, capacity);
  };

  const handleCapacityChange = (newCapacity: string) => {
    updateProduct(color, newCapacity);
  };

  useEffect(() => {
    if (productId) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const product = await client.getProductDeatils(productId);

          setData(product);

          const suggestedProducts = await client.getSuggestedProducts(
            product.category,
            8,
          );

          setSuggested(suggestedProducts);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      window.scrollTo({ top: 0 });
    }
  }, [productId]);

  useEffect(() => {
    if (data) {
      setSelectedImg(0);
      setColor(prev => prev ?? data.colorsAvailable?.[0] ?? null);
      setCapacity(prev => prev ?? data.capacityAvailable?.[0] ?? null);
      document.title = data.name;
    }
  }, [data]);

  const images = useMemo(
    () => (data?.images?.length ? data.images : data ? [data.image] : []),
    [data],
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Product was not found</p>;
  }

  if (!data) {
    return null;
  }

  const back = () => navigate(-1);

  const shortId = (id: string) => {
    const parts = id.split('-');

    return parts.slice(0, parts.length - 2).join('-');
  };

  return (
    <div className={style.section}>
      <div className={style.topNavDetails}>
        <Link to="/">
          <img
            src="/public/img/buttons/home_button.svg"
            alt="Link Home"
            className={style.imgHome}
          />
        </Link>
        <img src="/public/img/arrows/arrow_right_gray.svg" alt="button right" />
        <Link to={`/${data.category}`} className={style.category}>
          {data.category}
        </Link>
        <img src="/public/img/arrows/arrow_right_gray.svg" alt="button right" />
        <p className={style.nameNav}>{data.name}</p>
      </div>

      <div className={style.bottomNav}>
        <button onClick={back} className={style.buttonNav}>
          <img src="/public/img/arrows/arrow_left.svg" alt="button left" />
          Back
        </button>
      </div>

      <h2 className={style.headerDetails}>{data.name}</h2>

      <div>
        <div className={style.containers}>
          <div className={style.photoContainer}>
            <img
              src={images[selectedImg]}
              alt={data.name}
              className={style.mainPhoto}
            />
          </div>

          {images.length > 1 && (
            <div className={style.imagesContainer}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`${style.imageButton} ${
                    i === selectedImg ? style.imageButtonSelect : ''
                  }`}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={src} alt="" className={style.imagePhoto} />
                </button>
              ))}
            </div>
          )}

          <div className={style.detailsContainer}>
            {data.colorsAvailable?.length > 0 && (
              <div>
                <ProductColors
                  colors={data.colorsAvailable}
                  selectedColor={color}
                  onChange={handleColorChange}
                  id={data.id}
                />
              </div>
            )}

            {data.capacityAvailable?.length && (
              <ProductCapacity
                capacities={data.capacityAvailable}
                selectedCapacity={capacity}
                onChange={handleCapacityChange}
              />
            )}

            <ProductBuySection data={data} />
          </div>

          <p className={style.id}>id: {shortId(data.id)}</p>
        </div>

        <div className={style.containerBlock}>
          {data.description?.length && (
            <section className={style.sectionAbout}>
              <h2 className={style.titleHTwo}>About</h2>

              {data.description.map(desc => (
                <div key={desc.title}>
                  <h3 className={style.titleAbout}>{desc.title}</h3>
                  <p className={style.aboutParagraph}>{desc.text}</p>
                </div>
              ))}
            </section>
          )}

          <ProductTachSpect data={data} />
        </div>

        <section className={style.containerSlider}>
          {suggested ? (
            <ProductsSlider title="You may also like" products={suggested} />
          ) : (
            <Loader />
          )}
        </section>
      </div>
    </div>
  );
};
