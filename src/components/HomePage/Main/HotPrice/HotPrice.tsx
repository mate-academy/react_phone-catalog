import { useEffect, useRef, useState } from 'react';
import style from './Hotprice.module.scss';
import { useCart } from '../../../CartContext/CartContext';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  category: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string;
}

const allProducts = [
  '/api/phones.json',
  '/api/tablets.json',
  '/api/accessories.json',
];

export const HotPrice: React.FC = () => {
  const [products, setProducts] = useState<Props[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const { cartIds, likedIds, toggleCart, toggleLike } = useCart();

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    Promise.all(
      allProducts.map(productUrl =>
        fetch(`${cleanBase}${productUrl}`).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response.json();
        }),
      ),
    )
      .then(data => {
        const allFetchedProducts = data.flat();

        setProducts(allFetchedProducts as Props[]);
      })
      .catch(() => setProducts([]));
  }, []);

  const sortedToNewArray = [...products].sort(
    (a, b) => b.priceRegular - a.priceRegular,
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
  }, [sortedToNewArray.length]);

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

  return (
    <div className={style.contentContainer}>
      <div className={style.carouselContainer}>
        <h2 className={style.hotTitle}>Hot prices</h2>
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
          {sortedToNewArray.map(product => (
            <li className={style.item} key={product.id}>
              <Link className={style.Link} to={`/product/${product.id}`}>
                <img
                  className={style.imgPhone}
                  src={`${import.meta.env.BASE_URL}/${product.images[0]}`}
                  alt={product.name}
                />
                <p className={style.name}>{product.name}</p>
              </Link>
              <p className={style.price}>
                ${product.priceDiscount}{' '}
                <span className={style.fullprice}>${product.priceRegular}</span>
              </p>
              <div className={style.characteristics}>
                <div className={style.characteristic}>
                  <p className={style.characteristicText}>Screen</p>
                  <p className={style.characteristicText}>Capacity</p>
                  <p className={style.characteristicText}>RAM</p>
                </div>
                <div className={style.characteristicItem}>
                  <p className={style.characteristicItemText}>
                    {product.screen}
                  </p>
                  <p className={style.characteristicItemText}>
                    {product.capacity}
                  </p>
                  <p className={style.characteristicItemText}>{product.ram}</p>
                </div>
              </div>
              <div className={style.buttons}>
                <button
                  type="button"
                  onClick={() => toggleCart(String(product.id))}
                  className={`${style.addButton} ${
                    cartIds.has(String(product.id)) ? style.addButtonClick : ''
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
