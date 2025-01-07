import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Container } from '../../shared/components/Container';
import { fetchJson, getSuggestedProducts } from '../../api-func';
import { ProductItem } from '../../types/ProductItem';
import { AddButton } from '../../shared/components/AddButton';
import cn from 'classnames';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import s from './ProductPage.module.scss';
import { CardsSlider } from '../../shared/components/CardsSlider';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

export const ProductPage = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: string | undefined;
    productId: string;
  }>();
  const [sliderData, setSliderData] = useState<ProductItem[]>([]);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const categoryLink = category
    ? category[0].toUpperCase() + category.slice(1)
    : '';

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchJson(category ?? '');

        if (!data) {
          throw new Error('Data not found');
        }

        const selectedProduct = data.find(
          (item: ProductItem) => item.id === productId,
        );

        if (!selectedProduct) {
          throw new Error('Product not found');
        }

        setSliderData(data);
        setProduct(selectedProduct);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';

        setError(errorMessage);
      }
    };

    fetchProductData();
  }, [category, productId]);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const suggested = await getSuggestedProducts();

      setSliderData(suggested);
    };

    fetchSuggestedProducts();
  }, [category, productId]);

  if (error) {
    return <p className={s.ErrorMessage}>{error}</p>;
  }

  if (!product) {
    return (
      <div className="loader">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#313237"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  const handleColorChange = (color: string) => {
    const newProductId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

    navigate(`${product.category}/${newProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    const newProductId = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

    navigate(`${product.category}/${newProductId}`);
  };

  return (
    <div>
      <Container>
        <div className={s.PageContent}>
          <div className={s.NavigationField}>
            <div>
              <a href="" className={s.HomeLink} aria-label="Home link"></a>
              <div className={s.NavArrow} />
              <a href={`${product.category}`} className={s.CategoryLink}>
                {categoryLink}
              </a>
              <div className={s.NavArrow} />
              <p className={s.CurrentPage}>{product.name}</p>
            </div>

            <div className={s.BackLink}>
              <div className={s.LeftArrow} />
              <a
                className={s.CategoryLink}
                href={`${product.category}`}
                aria-label={`${product.category}`}
              >
                Back
              </a>
            </div>
          </div>

          <h1 className={s.ProductTitle}>{product.name}</h1>
          <section className={s.FirstSection}>
            <div className={s.SwiperField}>
              <div className={s.SwiperButtonsField}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${image}`}
                    alt={`${product.name} ${index}`}
                    onClick={() => thumbsSwiper?.slideTo(index)}
                    className={s.SwiperButton}
                  />
                ))}
              </div>

              <div className={s.LargeImageField}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  modules={[Thumbs]}
                  className="myMainSwiper"
                  style={{
                    maxHeight: '464px',
                  }}
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${image}`}
                        alt={`${product.name} ${index}`}
                        className={s.LargeImage}
                        style={{
                          maxHeight: '464px',
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className={s.InformationField}>
              <div className={s.ColorSwitcher}>
                <h4 className={s.SwitcherTitle}>Available colors</h4>
                <ul className={s.ColorsList}>
                  {product.colorsAvailable.map(color => (
                    <li
                      key={color}
                      className={cn(s.ColorItem, {
                        [s.Active]: product.color === color,
                      })}
                      onClick={() => handleColorChange(color)}
                    >
                      <div
                        className={cn(s.Color, s[color.split(' ').join('-')])}
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={s.CapacitySwitcher}>
                <h4 className={s.SwitcherTitle}>Select capacity</h4>
                <ul className={s.CapacityList}>
                  {product.capacityAvailable.map(capacity => (
                    <li
                      key={capacity}
                      className={cn(s.CapacityItem, {
                        [s.Active]: product.capacity === capacity,
                      })}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      <p>{capacity}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className={s.Price}>&#36;{product.priceRegular}</p>
              <div className={s.ButtonsField}>
                <AddButton product={product} />
              </div>

              <ul className={s.InfoField}>
                <li className={s.InfoItem}>
                  <p>Screen</p>
                  <p>{product.screen}</p>
                </li>

                <li className={s.InfoItem}>
                  <p>Resolution</p>
                  <p>{product.resolution}</p>
                </li>

                <li className={s.InfoItem}>
                  <p>Processor</p>
                  <p>{product.processor}</p>
                </li>

                <li className={s.InfoItem}>
                  <p>RAM</p>
                  <p>{product.ram}</p>
                </li>
              </ul>
            </div>
          </section>

          <section className={s.SecondSection}>
            <div className={s.About}>
              <h2 className={s.SectionTitle}>About</h2>

              {product.description.map((field, index) => (
                <div className={s.DescriptionField} key={index}>
                  <h3 className={s.DescriptionTitle}>{field.title}</h3>
                  <p className={s.DescriptionText}>{field.text}</p>
                </div>
              ))}
            </div>

            <div className={s.TechSpecsField}>
              <h2 className={s.SectionTitle}>Tech specs</h2>

              <ul className={s.TechSpecsList}>
                <li className={s.TechSpecsItem}>
                  <p>Screen</p>
                  <p>{product.screen}</p>
                </li>

                <li className={s.TechSpecsItem}>
                  <p>Resolution</p>
                  <p>{product.resolution}</p>
                </li>

                <li className={s.TechSpecsItem}>
                  <p>Processor</p>
                  <p>{product.processor}</p>
                </li>

                <li className={s.TechSpecsItem}>
                  <p>RAM</p>
                  <p>{product.ram}</p>
                </li>

                <li className={s.TechSpecsItem}>
                  <p>Built in memory</p>
                  <p>{product.capacity}</p>
                </li>

                {product.camera && (
                  <li className={s.TechSpecsItem}>
                    <p>Camera</p>
                    <p>{product.camera}</p>
                  </li>
                )}

                {product.zoom && (
                  <li className={s.TechSpecsItem}>
                    <p>Zoom</p>
                    <p>{product.zoom}</p>
                  </li>
                )}

                <li className={s.TechSpecsItem}>
                  <p>Cell</p>
                  <div>
                    {product.cell.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index !== product.cell.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className={s.ThirdSection}>
            <CardsSlider
              title={'You may also like'}
              products={sliderData}
              discount={false}
            />
          </section>
        </div>
      </Container>
    </div>
  );
};
