import listStyle from './ListOfGadgets.module.scss';
import { Iphones, Tablets, Products } from '../../types/types';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination';
import { useCart } from '../../context/CartContext';
import cn from 'classnames';
import Footer from '../Footer';

interface Props {
  gadgets: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const ListOfGadgets: React.FC<Props> = ({
  gadgets,
  setCurrentPage,
  currentPage,
}) => {
  const [typeOfGadgets, setTypeOfGadgets] = useState<Products[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { lovelyProducts, setLovelyProducts } = useCart();
  const { cartItems, setCartItems } = useCart();

  console.log(gadgets);

  const sort = searchParams.get('sort');
  const perItems = searchParams.get('quantity') || 16;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => {
        // Фільтруємо тільки потрібну категорію
        const filtered = data.filter(
          (item: Products) => item.category === gadgets,
        );

        // console.log(filtered);

        setTypeOfGadgets(filtered);
      })
      .finally(() => setLoading(false));
  }, [gadgets]);

  // const pageQuantity = Math.ceil(typeOfGadgets.length / currentPage);
  const passedItems = +perItems * currentPage - +perItems;

  console.log(cartItems);
  console.log(lovelyProducts);
  // console.log(perItems);

  // console.log(typeOfGadgets);

  let filteredGadgets: Products[] | [] = [];

  filteredGadgets = [...typeOfGadgets].filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  console.log(typeOfGadgets);
  console.log(filteredGadgets);

  if (sort === 'cheapest') {
    filteredGadgets = [...filteredGadgets].sort((gadget1, gadget2) => {
      return gadget1.price - gadget2.price;
    });
  }

  if (sort === 'alphabetically') {
    filteredGadgets = [...filteredGadgets].sort((gadget1, gadget2) => {
      return gadget1.name.localeCompare(gadget2.name);
    });
  }

  if (sort === 'newest') {
    filteredGadgets = filteredGadgets.sort((gadget1, gadget2) => {
      return gadget2.year - gadget1.year;
    });
  }

  let renderCards: Products[] | [] = JSON.parse(
    JSON.stringify(filteredGadgets),
  );

  if (perItems !== 'all') {
    renderCards = filteredGadgets.slice(passedItems, passedItems + +perItems);
  }

  console.log(renderCards);

  // const seekProducts = renderCards.filter(product =>
  //   product.name.toLowerCase().includes(query.toLowerCase()),
  // );

  // console.log(seekProducts);

  const favoritesArray: Products[] | [] = JSON.parse(
    localStorage.getItem('favorites') || '[]',
  );

  const addedArray: Products[] | [] = JSON.parse(
    localStorage.getItem('added') || '[]',
  );

  const handleAddToCart = (product: Products) => {
    const existing = cartItems.find(item => item.itemId === product.itemId);

    if (existing) {
      const filteredProducts = cartItems.filter(
        item => item.itemId !== product.itemId,
      );

      setCartItems(filteredProducts);
      localStorage.setItem('added', JSON.stringify(filteredProducts));
    } else {
      const newProduct = { ...product, quantity: 1 };
      const allGadgets = [...cartItems, newProduct];

      setCartItems(allGadgets);
      localStorage.setItem('added', JSON.stringify(allGadgets));
    }
  };
  // const handleAddToCart = (product: Products) => {
  //   if (cartItems.some(item => item.itemId === product.itemId)) {
  //     const filteredProducts = cartItems.filter(
  //       item => item.itemId !== product.itemId,
  //     );

  //     setCartItems(filteredProducts);

  //     localStorage.setItem('added', JSON.stringify(filteredProducts));
  //   } else {
  //     setCartItems(currentsProducts => [...currentsProducts, product]);
  //     const allGadgets = [...cartItems, product];

  //     console.log(allGadgets);

  //     localStorage.setItem('added', JSON.stringify(allGadgets));
  //   }
  // };

  const addProductToLovely = (product: Products) => {
    if (lovelyProducts.some(item => item.itemId === product.itemId)) {
      const filteredProducts = lovelyProducts.filter(
        item => item.itemId !== product.itemId,
      );

      setLovelyProducts(filteredProducts);

      const updatedFavorites = favoritesArray.filter(
        item => item.itemId !== product.itemId,
      );

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      setLovelyProducts(currentsProducts => [...currentsProducts, product]);
      const allGadgets = [...lovelyProducts, product];

      localStorage.setItem('favorites', JSON.stringify(allGadgets));
    }
  };

  // console.log(favoritesArray);
  // console.log(addedArray);
  // console.log(cartItems);
  // console.log(lovelyProducts);

  return (
    <>
      <div className={listStyle.list}>
        {renderCards.map(gadget => {
          return (
            <Link
              to={`/${gadgets}/${gadget.itemId}`}
              key={gadget.id}
              className={listStyle.list__reference}
            >
              <div className={listStyle.list__card}>
                <div
                  style={{ backgroundImage: `url('${gadget.image}')` }}
                  className={listStyle.list__image}
                ></div>

                <div className={listStyle.list__data}>
                  <div className={listStyle.list__name}>{gadget.name}</div>
                  <div className={listStyle.list__price}>
                    ${gadget.fullPrice}
                  </div>

                  <div className={listStyle.list__info}>
                    <div className={listStyle['list__gadget-parameters']}>
                      Screen
                    </div>
                    <div>{gadget.screen}</div>
                  </div>
                  <div className={listStyle.list__info}>
                    <div className={listStyle['list__gadget-parameters']}>
                      Capacity
                    </div>
                    <div className={listStyle.list__gb}>128 GB</div>
                  </div>
                  <div className={listStyle.list__info}>
                    <div className={listStyle['list__gadget-parameters']}>
                      RAM
                    </div>
                    <div>6 GB</div>
                  </div>

                  <div className={listStyle.list__buttons}>
                    <button
                      className={cn(listStyle.list__add, {
                        [listStyle.list__added]: cartItems.some(
                          item => item.itemId === gadget.itemId,
                        ),
                      })}
                      onClick={event => {
                        event.preventDefault();
                        handleAddToCart(gadget);
                      }}
                    >
                      {cartItems.some(item => item.itemId === gadget.itemId)
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </button>

                    <button
                      // style={}
                      className={cn(listStyle['list__lovely-choice'], {
                        [listStyle['list__lovely-choice--active']]:
                          lovelyProducts.some(
                            item => item.itemId === gadget.itemId,
                          ),
                      })}
                      onClick={event => {
                        event.preventDefault();
                        addProductToLovely(gadget);
                      }}
                    ></button>
                  </div>
                </div>

                {/* <div className={listStyle.list__deteils}>

              </div> */}
              </div>
            </Link>
          );
        })}
      </div>

      {perItems !== 'all' && (
        <Pagination
          filteredGadgets={filteredGadgets}
          itemsLength={typeOfGadgets.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Footer />
    </>
  );
};

export default ListOfGadgets;
