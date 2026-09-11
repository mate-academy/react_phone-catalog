import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import style from './ProductCard.module.scss';
import { useCart } from '../../CartContext/CartContext';
import { ProductNotFound } from '../ProductNotFound';
import { getSuggestedProducts } from '../getSuggestedProducts';
import { Product } from '../useAllProducts/useAllProducts';

const allProducts = [
  '/api/phones.json',
  '/api/tablets.json',
  '/api/accessories.json',
];

export const ProductCard = () => {
  const { productId } = useParams<{ productId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [productimg, setProductimg] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const navigate = useNavigate();
  const { cartIds, likedIds, toggleCart, toggleLike } = useCart();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    Promise.all(
      allProducts.map(url =>
        fetch(`${import.meta.env.BASE_URL}${url}`).then(response =>
          response.json(),
        ),
      ),
    )
      .then(productArrays => setProducts(productArrays.flat()))
      .catch(() => setProducts([]));
  }, []);

  const product = products.find(p => String(p.id) === productId);

  const changeColor = (color: string) => {
    if (!product) {
      return;
    }

    const variant = products.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.color === color &&
        item.capacity === selectedCapacity,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const changeCapacity = (capacity: string) => {
    if (!product) {
      return;
    }

    const variant = products.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === capacity &&
        item.color === selectedColor,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedCapacity(product.capacity);
      setSelectedColor(product.color);
      setProductimg(product.images[0]);
    }
  }, [product]);

  const suggestedProducts = useMemo(
    () => getSuggestedProducts(products, String(product?.id ?? '')),
    [products, product],
  );

  const scrollButton = () => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    setCanScrollPrev(list.scrollLeft > 0);
    setCanScrollNext(list.scrollLeft + list.clientWidth < list.scrollWidth - 1);
  };

  useEffect(() => {
    scrollButton();
  }, [suggestedProducts.length]);

  const scrollByCards = (direction: 1 | -1) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const card = list.querySelector(`.${style.item}`) as HTMLElement | null;
    const cardWidth = card
      ? card.getBoundingClientRect().width
      : list.clientWidth;

    const gap = 16;
    const cardsPerScroll = 3;

    list.scrollBy({
      left: direction * (cardWidth + gap) * cardsPerScroll,
      behavior: 'smooth',
    });
  };

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <main>
      <div className={style.prouctCard}>
        <div className={style.home}>
          <Link to="/">
            <img
              className={style.linkimg}
              src={`${import.meta.env.BASE_URL}/img/Home.png`}
              alt="Home"
            />
          </Link>
          <p className={style.linkText}>&#707;</p>
          <Link to={`/${product.category}`} className={style.linkText}>
            {product.category}
          </Link>
          <p className={style.linkText}>&#707;</p>
          <p className={style.linkText}>{product.name}</p>
        </div>

        <button
          type="button"
          className={style.Back}
          onClick={() => navigate(-1)}
        >
          &#8249; Back
        </button>

        <div className={style.Card}>
          <h1 className={style.cardTitle}>{product.name}</h1>

          <div className={style.product}>
            <div className={style.productImages}>
              <div className={style.Heroimg}>
                <img
                  className={style.imgbutton}
                  src={`${import.meta.env.BASE_URL}/${productimg}`}
                  alt={product.name}
                />
              </div>

              <div className={style.otherimg}>
                {product.images.map(img => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setProductimg(img)}
                    className={`${style.buttonimg} ${
                      img === productimg ? style.selectimg : ''
                    }`}
                  >
                    <img
                      className={style.imgbutton}
                      src={`${import.meta.env.BASE_URL}/${img}`}
                      alt={product.name}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className={style.productDescription}>
              <div className={style.productColors}>
                <p className={style.selectText}>Available colors</p>
                <div className={style.selectColors}>
                  {product.colorsAvailable.map(color => (
                    <button
                      key={color}
                      type="button"
                      style={{ backgroundColor: `${color}` }}
                      className={`${style.colorsButtons} ${
                        color === selectedColor ? style.onselectColor : ''
                      }`}
                      onClick={() => changeColor(color)}
                    ></button>
                  ))}
                </div>
              </div>

              <div className={style.productCapacity}>
                <p className={style.selectText}>Select capacity</p>
                <div className={style.selectCapacity}>
                  {product.capacityAvailable.map(capacity => (
                    <button
                      key={capacity}
                      type="button"
                      className={`${style.capacityButtons} ${
                        capacity === selectedCapacity
                          ? style.onselectCapacity
                          : ''
                      }`}
                      onClick={() => changeCapacity(capacity)}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>

              <div className={style.productBuy}>
                <p className={style.price}>
                  ${product.priceDiscount}{' '}
                  <span className={style.fullprice}>
                    ${product.priceRegular}
                  </span>
                </p>

                <div className={style.buttons}>
                  <button
                    type="button"
                    onClick={() => toggleCart(String(product.id))}
                    className={`${style.addButton} ${
                      cartIds.has(String(product.id))
                        ? style.addButtonClick
                        : ''
                    }`}
                  >
                    {cartIds.has(String(product.id)) ? 'Added' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className={`${style.likeButton} ${
                      likedIds.has(String(product.id))
                        ? style.likeButtonClick
                        : ''
                    }`}
                    onClick={() => toggleLike(String(product.id))}
                  >
                    {likedIds.has(String(product.id)) ? (
                      <img
                        className={style.imgLike}
                        src={`${import.meta.env.BASE_URL}/img/liked.png`}
                        alt="Liked"
                      />
                    ) : (
                      <img
                        className={style.imgLike}
                        src={`${import.meta.env.BASE_URL}/img/heart-like.svg`}
                        alt="Like"
                      />
                    )}
                  </button>
                </div>

                <div className={style.characteristics}>
                  <div className={style.characteristic}>
                    <p className={style.characteristicText}>Screen</p>
                    <p className={style.characteristicText}>Resolution</p>
                    <p className={style.characteristicText}>Processor</p>
                    <p className={style.characteristicText}>RAM</p>
                  </div>
                  <div className={style.characteristicItem}>
                    <p className={style.characteristicItemText}>
                      {product.screen}
                    </p>
                    <p className={style.characteristicItemText}>
                      {product.resolution}
                    </p>
                    <p className={style.characteristicItemText}>
                      {product.processor}
                    </p>
                    <p className={style.characteristicItemText}>
                      {product.ram}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.description}>
          <div className={style.about}>
            <h2 className={style.descriptionTitle}>About</h2>
            {product.description.map(description => (
              <div key={description.title} className={style.aboutDescription}>
                <h3 className={style.textTitle}>{description.title}</h3>
                <p className={style.descriptionText}>{description.text}</p>
              </div>
            ))}
          </div>
          <div className={style.techSpecs}>
            <h2 className={style.descriptionTitle}>Tech specs</h2>
            <div className={style.characteristics}>
              <div className={style.characteristic}>
                <p className={style.characteristicText}>Screen</p>
                <p className={style.characteristicText}>Resolution</p>
                <p className={style.characteristicText}>Processor</p>
                <p className={style.characteristicText}>RAM</p>
                <p className={style.characteristicText}>Built in memory</p>
                <p className={style.characteristicText}>Camera</p>
                <p className={style.characteristicText}>Zoom</p>
                <p className={style.characteristicText}>Cell</p>
              </div>
              <div className={style.characteristicItem}>
                <p className={style.characteristicItemText}>{product.screen}</p>
                <p className={style.characteristicItemText}>
                  {product.resolution}
                </p>
                <p className={style.characteristicItemText}>
                  {product.processor}
                </p>
                <p className={style.characteristicItemText}>{product.ram}</p>
                <p className={style.characteristicItemText}>
                  {product.capacity}
                </p>
                <p className={style.characteristicItemText}>{product.camera}</p>
                <p className={style.characteristicItemText}>{product.zoom}</p>
                <p
                  className={style.characteristicItemText}
                >{`${product.cell},`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.contentContainer}>
          <div className={style.carouselContainer}>
            <h2 className={style.hotTitle}>You may also like</h2>
            <div className={style.controls}>
              <button
                type="button"
                aria-label="Previous"
                className={style.scrollbutton}
                onClick={() => scrollByCards(-1)}
                disabled={!canScrollPrev}
              >
                &lt;
              </button>
              <button
                type="button"
                aria-label="Next"
                className={style.scrollbutton}
                onClick={() => scrollByCards(1)}
                disabled={!canScrollNext}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className={style.carousel}>
            <ul className={style.list} ref={listRef} onScroll={scrollButton}>
              {suggestedProducts.map(productes => (
                <li className={style.item} key={productes.id}>
                  <Link
                    onClick={scrollToTop}
                    className={style.Link}
                    to={`/product/${productes.id}`}
                  >
                    <img
                      className={style.imgPhone}
                      src={`${import.meta.env.BASE_URL}/${productes.images[0]}`}
                      alt={productes.name}
                    />
                    <p className={style.name}>{productes.name}</p>
                  </Link>
                  <p className={style.price}>
                    ${productes.priceDiscount}{' '}
                    <span className={style.fullprice}>
                      ${productes.priceRegular}
                    </span>
                  </p>
                  <div className={style.characteristics}>
                    <div className={style.characteristic}>
                      <p className={style.characteristicText}>Screen</p>
                      <p className={style.characteristicText}>Capacity</p>
                      <p className={style.characteristicText}>RAM</p>
                    </div>
                    <div className={style.characteristicItem}>
                      <p className={style.characteristicItemText}>
                        {productes.screen}
                      </p>
                      <p className={style.characteristicItemText}>
                        {productes.capacity}
                      </p>
                      <p className={style.characteristicItemText}>
                        {productes.ram}
                      </p>
                    </div>
                  </div>
                  <div className={style.buttons}>
                    <button
                      type="button"
                      onClick={() => toggleCart(productes.id)}
                      className={`${style.addButton} ${
                        cartIds.has(productes.id) ? style.addButtonClick : ''
                      }`}
                    >
                      {cartIds.has(productes.id) ? 'Added' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className={`${style.likeButton} ${
                        likedIds.has(productes.id) ? style.likeButtonClick : ''
                      }`}
                      onClick={() => toggleLike(productes.id)}
                    >
                      {likedIds.has(productes.id) ? (
                        <img
                          className={style.imgLike}
                          src={`${import.meta.env.BASE_URL}/img/liked.png`}
                          alt="Liked"
                        />
                      ) : (
                        <img
                          className={style.imgLike}
                          src={`${import.meta.env.BASE_URL}/img/heart-like.svg`}
                          alt="Like"
                        />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
