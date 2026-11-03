import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams, Link } from 'react-router-dom';
import { deleteCookie, exportCookie, importCookie } from '../cookie';
import './ProductoEspecifico.scss';
import { getApi } from '../../getApi';
import { CategoryType } from '../../interface';
import { Product } from '../../interface';
import { useEffect, useState, useCallback } from 'react';

export const ProdutoEspec = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productShip, setProductShip] = useState<Product>();
  const [product, setProduct] = useState<CategoryType | undefined>();
  const [listProducst, setListProducts] = useState<Product[]>();
  const [activeImage, setActiveImage] = useState<string>();
  const [openDesc, setOpenDesc] = useState<number | null>(null);

  const [savedCart, setSavedCart] = useState<Product[] | null>([]);

  const getCookie = () => {
    const productsCookies = importCookie('cart');

    setSavedCart(productsCookies);
  };

  useEffect(() => {
    getCookie();
  }, []);

  const getData = useCallback(async () => {
    try {
      const newArr: Product[] = await getApi('products');
      const especificProduct: Product | undefined = newArr.find(
        r => r.itemId === searchParams.get('productId'),
      );

      setProductShip(especificProduct);
      const produtoDefinitivo: CategoryType[] = await getApi(
        especificProduct?.category || '',
      );

      setListProducts(newArr);
      setProduct(
        produtoDefinitivo.find(r => r.id === searchParams.get('productId')),
      );
    } catch (e) {
      throw new Error('Erro no getData');
    }
  }, [searchParams]);

  const setNewProduct = (color: string, capacity: string) => {
    const newName = `${product?.namespaceId.split('_')}-${capacity.toLowerCase()}-${color.toLowerCase()}`;

    const newProduct = listProducst?.find(r => r.itemId.startsWith(newName));

    if (newProduct?.itemId !== product?.id && newProduct !== undefined) {
      searchParams.set('productId', newProduct?.itemId);
      setSearchParams(searchParams);
      setActiveImage(newProduct.image);
    }

    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="pages-div">
        <h5>
          <FontAwesomeIcon icon={faHouse} />

          <span>&gt;</span>

          <span>
            {'   '}
            {searchParams
              ?.get('productId')
              ?.replace(/\b\w/g, l => l.toUpperCase())
              .replaceAll('-', ' ')}
          </span>
        </h5>
        <br />
        <Link to="/home" className="back-link">
          &lt; Back
        </Link>
      </div>

      {product?.category && product?.namespaceId && product?.color && (
        <div className="centre-div">
          <div className="productPage-div">
            <h1>
              {searchParams
                .get('productId')
                ?.replace(/\b\w/g, l => l.toUpperCase())
                .replaceAll('-', ' ')}
            </h1>
            <div className="images-central">
              <div className="contentLowerImage">
                {product.images.map(r => (
                  <img
                    key={r}
                    src={r}
                    className={`lowerImage ${activeImage === r ? 'lowerImage-active' : null}`}
                    /* onError={e => {
                      e.currentTarget.style.display = 'none';
                    }} */
                    onClick={() => setActiveImage(r)}
                  />
                ))}
              </div>
              <img
                src={activeImage ? activeImage : product.images[0]}
                className="centralImage"
              />
            </div>
          </div>
          <div className="product-informations">
            <div className="productOptions-div">
              {' '}
              <div className="aveilable-colors-div">
                <h4>Available colors</h4>
                <div className="colors-content">
                  {product.colorsAvailable.map(color => (
                    <>
                      <div
                        className={`colors ${searchParams.get('productId')?.includes(color) ? 'option-active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewProduct(color, product.capacity)}
                      ></div>
                    </>
                  ))}
                </div>
              </div>
              <div className="capacity-div">
                <div className="capacity-options">
                  <h4>Select capacity</h4>
                  <div className="capacity-contents">
                    {product.capacityAvailable.map(capacity => (
                      <>
                        <button
                          className={`capacity-select ${searchParams.get('productId')?.includes(capacity.toLocaleLowerCase()) ? 'option-active' : ''}`}
                          onClick={() => setNewProduct(product.color, capacity)}
                        >
                          {capacity}
                        </button>
                      </>
                    ))}
                  </div>
                </div>
                <div className="aveilable-colors-div"></div>
              </div>
              <div className="productPrices">
                <div className="prices">
                  <h3>R${product.priceDiscount},00</h3>
                  <h4>R${product.priceRegular},00</h4>
                </div>
              </div>
              <div className="addDiv">
                <button
                  className={`addToCart ${savedCart?.some(r => r.id === productShip?.id) ? 'savedCart' : ''}`}
                  onClick={() => {
                    if (
                      !importCookie('cart')?.some(r => r.id === productShip?.id)
                    ) {
                      exportCookie(productShip, 'cart', productShip?.id);
                    } else {
                      deleteCookie('cart', productShip?.id);
                    }

                    getCookie();
                  }}
                >
                  {`${savedCart?.some(r => r.id === productShip?.id) ? 'ADDED TO CART' : 'ADD TO CART'}`}
                </button>
                <button
                  className={`addFavorite ${importCookie('favorities')?.some(r => r.id === productShip?.id) ? 'saved-favorite' : ''}`}
                  onClick={() => {
                    if (
                      !importCookie('favorities')?.some(
                        r => r.id === productShip?.id,
                      )
                    ) {
                      exportCookie(productShip, 'favorities', productShip?.id);
                    } else {
                      deleteCookie('favorities', productShip?.id);
                    }

                    getCookie();
                  }}
                >
                  ADD FAVORITE
                </button>
              </div>
            </div>
            <div className="techInformations-div">
              <div className="informations">
                <h2>Tech specs</h2>

                <ul>
                  {product.screen && (
                    <li>
                      <span>Screen</span>
                      <strong>{product.screen}</strong>
                    </li>
                  )}

                  {product.resolution && (
                    <li>
                      <span>Resolution</span>
                      <strong>{product.resolution}</strong>
                    </li>
                  )}

                  {product.processor && (
                    <li>
                      <span>Processor</span>
                      <strong>{product.processor}</strong>
                    </li>
                  )}

                  {product.ram && (
                    <li>
                      <span>RAM</span>
                      <strong>{product.ram}</strong>
                    </li>
                  )}

                  {product.builtInMemory && (
                    <li>
                      <span>Built-in memory</span>
                      <strong>{product.builtInMemory}</strong>
                    </li>
                  )}

                  {product.camera && (
                    <li>
                      <span>Camera</span>
                      <strong>{product.camera}</strong>
                    </li>
                  )}

                  {product.zoom && (
                    <li>
                      <span>Zoom</span>
                      <strong>{product.zoom}</strong>
                    </li>
                  )}

                  {product.cell && (
                    <li>
                      <span>Cell</span>
                      <strong>{product.cell.join(', ')}</strong>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="product-titles">
            {product.description?.map((item, index) => (
              <div key={item.title} className="description-box">
                <button
                  type="button"
                  className="description-title"
                  onClick={() => setOpenDesc(openDesc === index ? null : index)}
                >
                  {item.title} {openDesc === index ? '▲' : '▼'}
                </button>

                {openDesc === index && (
                  <div className="description-text">
                    {item.text.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
