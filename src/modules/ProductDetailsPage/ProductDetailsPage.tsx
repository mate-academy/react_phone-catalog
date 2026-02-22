import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Spinner } from '../../components/Spinner';
import { GoBack } from '../../components/GoBack';
import ProductNotFound from '../../assets/img/product-not-found.png';
import { FavoritesButton } from '../../components/FavoritesButton';
import { Slider } from '../../components/Slider';
import { LinksRoad } from '../../components/LinksRoad';
import { useSwipeable } from 'react-swipeable';
import { CartButton } from '../../components/CartButton';

export const ProductDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, productId } = useParams<{
    category: 'phones' | 'accessories' | 'tablets';
    productId: string;
  }>();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const baseUrl = import.meta.env.BASE_URL;

  const allStrangeColors: { [key: string]: string } = {
    spaceblack: '#403E3D',
    spaceblue: '#2D4E5C',
    spacegray: '#1C1C1E',
    midnightgreen: '#4C5C52',
    gold: '#FFbF00',
    silver: '#F1F2ED',
    graphite: '#54524F',
    starlight: '#9A9898',
    sierrablue: '#A7C1D9',
  };

  const withBaseUrl = (path: string) =>
    `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const loadData = async () => {
    if (!category || !productId) return;

    setLoading(true);
    setErr(false);

    try {
      const response = await fetch(`/react_phone-catalog/api/${category}.json`);
      if (!response.ok) throw new Error('Product not found');

      const data: Product[] = await response.json();
      const foundProduct = data.find(p => p.id === productId);
      if (!foundProduct) throw new Error('Product not found');

      setProduct(foundProduct);
      const filtered = data.filter(
        p => p.namespaceId === foundProduct.namespaceId && p.id !== foundProduct.id
      );
      setSimilarProducts(filtered);
    } catch {
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (newCapacity: string, newColor: string) => {
    if (!product) return;

    if (
      (newCapacity === selectedCapacity && newColor === selectedColor)
    ) {
      return;
    }

    setLoading(true);
    setErr(false);

    try {
      const response = await fetch(`/react_phone-catalog/api/${category}.json`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const products: Product[] = await response.json();
      const matchedProduct = products.find(
        p =>
          p.namespaceId === product.namespaceId &&
          p.capacity === newCapacity &&
          p.color === newColor
      );

      if (!matchedProduct) throw new Error('Matching product not found');

      setProduct(matchedProduct);
      setSelectedCapacity(newCapacity);
      setSelectedColor(newColor);
      setMainImgIndex(0);
    } catch {
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  const updateParams = (capacity: string, color: string) => {
    setSearchParams({ capacity, color });
    handleChange(capacity, color);
  };

  useEffect(() => {
    loadData();
  }, [productId, category]);

  useEffect(() => {
    if (product) {
      const capacityFromURL = searchParams.get('capacity');
      const colorFromURL = searchParams.get('color');

      if (
        capacityFromURL &&
        colorFromURL &&
        (capacityFromURL !== product.capacity || colorFromURL !== product.color)
      ) {
        handleChange(capacityFromURL, colorFromURL);
      } else {
        setSelectedCapacity(product.capacity);
        setSelectedColor(product.color);
        setSearchParams({ capacity: product.capacity, color: product.color });
      }
    }
  }, [product]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (product) {
        setMainImgIndex(prev => (prev < product.images.length - 1 ? prev + 1 : 0));
      }
    },
    onSwipedRight: () => {
      if (product) {
        setMainImgIndex(prev => (prev > 0 ? prev - 1 : product.images.length - 1));
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <>
      {loading && <Spinner />}
      {err && (
        <div className="err">
          <div className="container">
            <div className="err_wrapper">
              <img src={ProductNotFound} className="err_img" alt="error" />
              <button className="err_btn" onClick={loadData}>
                Reload
              </button>
            </div>
          </div>
        </div>
      )}

      {product && (
        <>
          <section className="product_details">
            <div className="container">
              <div className="product_details_top">
                <LinksRoad
                  category={category}
                  productTitle={`${product.name} ${selectedCapacity} ${selectedColor}`}
                />
                <GoBack />
                <h1 className="product_details_title">{product.name}</h1>
              </div>

              <div className="product_details_wrapper">
                <div className="product_details_images">
                  <div className="product_details_images_main">
                    <img
                      className="product_details_images_main_image"
                      src={withBaseUrl(product.images[mainImgIndex])}
                      alt="product"
                      {...handlers}
                    />
                  </div>

                  <div className="product_details_secondary-imgs">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        className={
                          index === mainImgIndex
                            ? 'product_details_secondary-img product_details_secondary-img--active'
                            : 'product_details_secondary-img'
                        }
                        src={withBaseUrl(image)}
                        alt="thumbnail"
                        onClick={() => setMainImgIndex(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="product_details_other">
                  <div className="product_details_colors">
                    <h5 className="product_details_colors_title">Available colors</h5>
                    <div className="product_details_colors_wrapper">
                      {product.colorsAvailable.map((color, index) => (
                        <div
                          key={index}
                          className={
                            selectedColor === color
                              ? 'product_details_colors_color product_details_colors_color--active'
                              : 'product_details_colors_color'
                          }
                          onClick={() => updateParams(selectedCapacity, color)}
                        >
                          <div
                            className="product_details_colors_color_child"
                            style={{
                              backgroundColor: allStrangeColors[color] || color,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="product_details_colors_line product_details_line"></div>
                  </div>

                  <div className="product_details_capacity">
                    <h5 className="product_details_capacity_title">Select capacity</h5>
                    <div className="product_details_capacity_wrapper">
                      {product.capacityAvailable.map((c, index) => (
                        <div
                          key={index}
                          className={
                            selectedCapacity === c
                              ? 'product_details_capacity_item product_details_capacity_item--active'
                              : 'product_details_capacity_item'
                          }
                          onClick={() => updateParams(c, selectedColor)}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                    <div className="product_details_capacity_line product_details_line"></div>
                  </div>

                  <div className="product_details_buy">
                    <div className="product_details_buy_pricing">
                      {product.priceDiscount ? (
                        <>
                          <p className="product_details_buy_pricing_price-discount">
                            ${product.priceDiscount}
                          </p>
                          <p className="product_details_buy_pricing_price-regular">
                            ${product.priceRegular}
                          </p>
                        </>
                      ) : (
                        <p className="product_details_buy_pricing_price-discount">
                          ${product.priceRegular}
                        </p>
                      )}
                    </div>
                    <div className="product_details_buy_btns">
                      <CartButton product={product} />
                      <FavoritesButton
                        className="product_details_buy_btn product_details_buy_btn--favorite"
                        productId={product.id}
                      />
                    </div>
                  </div>

                  <div className="product_details_parameters">
                    <div className="product_details_parameters_wrapper">
                      <p className="product_details_parameters_key">Screen</p>
                      <p className="product_details_parameters_value">{product.screen}</p>
                    </div>
                    <div className="product_details_parameters_wrapper">
                      <p className="product_details_parameters_key">Resolution</p>
                      <p className="product_details_parameters_value">{product.resolution}</p>
                    </div>
                    <div className="product_details_parameters_wrapper">
                      <p className="product_details_parameters_key">Processor</p>
                      <p className="product_details_parameters_value">{product.processor}</p>
                    </div>
                    <div className="product_details_parameters_wrapper">
                      <p className="product_details_parameters_key">RAM</p>
                      <p className="product_details_parameters_value">{product.ram}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product_details_about">
                <div className="product_details_about_description">
                  <h3 className="product_details_about_description_title">About</h3>
                  <div className="product_details_about_description_line product_details_line"></div>
                  <div className="product_details_about_description_desc_container">
                    {product.description.map((desc, index) => (
                      <div className="product_details_about_description_desc" key={index}>
                        <div className="product_details_about_description_desc_wrapper">
                          <h4 className="product_details_about_description_desc_title">
                            {desc.title}
                          </h4>
                          <p className="product_details_about_description_desc_text">
                            {desc.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product_details_about_specs">
                  <h4 className="product_details_about_specs_title">Tech specs</h4>
                  <div className="product_details_about_specs_line product_details_line"></div>
                  <div className="product_details_about_specs_container">
                    <div className="product_details_about_specs_wrapper">
                      <p className="product_details_about_specs_key">Screen</p>
                      <p className="product_details_about_specs_value">{product.screen}</p>
                    </div>
                    <div className="product_details_about_specs_wrapper">
                      <p className="product_details_about_specs_key">Resolution</p>
                      <p className="product_details_about_specs_value">{product.resolution}</p>
                    </div>
                    <div className="product_details_about_specs_wrapper">
                      <p className="product_details_about_specs_key">Processor</p>
                      <p className="product_details_about_specs_value">{product.processor}</p>
                    </div>
                    <div className="product_details_about_specs_wrapper">
                      <p className="product_details_about_specs_key">RAM</p>
                      <p className="product_details_about_specs_value">{product.ram}</p>
                    </div>
                    <div className="product_details_about_specs_wrapper">
                      <p className="product_details_about_specs_key">Built in memory</p>
                      <p className="product_details_about_specs_value">{product.capacity}</p>
                    </div>
                    {product.camera && (
                      <div className="product_details_about_specs_wrapper">
                        <p className="product_details_about_specs_key">Camera</p>
                        <p className="product_details_about_specs_value">{product.camera}</p>
                      </div>
                    )}
                    {product.zoom && (
                      <div className="product_details_about_specs_wrapper">
                        <p className="product_details_about_specs_key">Zoom</p>
                        <p className="product_details_about_specs_value">{product.zoom}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container">
            <Slider title="You may also like" products={similarProducts} />
          </div>
        </>
      )}
    </>
  );
};
