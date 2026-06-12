// import { Link } from 'react-router-dom';
// import styles from './HotPrice.module.scss';
// import { Goods } from '../../types/Alltypes';
// import React, { useEffect, useState } from 'react';
// import { getData } from '../../fetch/httpClient';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import { useCart } from '../../context/CartContext';

// type Props = {
//   product: Goods[];
// };

// export const HotPrice: React.FC<Props> = ({ product }) => {
//   const [goodsFromApi, setGoodsFromApi] = useState<Goods[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const { cart, totalQuantity, totalPrice } = useCart();

//   useEffect(() => {
//     if (product.length === 0) {
//       Promise.all([
//         getData<Goods[]>('./api/phones.json'),
//         getData<Goods[]>('./api/tablets.json'),
//         getData<Goods[]>('./api/accessories.json'),
//       ])
//         .then(([phones, tablets, accessories]) => {
//           const allProducts = [...phones, ...tablets, ...accessories];

//           setGoodsFromApi(allProducts);
//         })
//         .catch(err => {
//           // eslint-disable-next-line no-console
//           console.error(err);
//           setError('Something went wrong');
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setGoodsFromApi(product);
//       setLoading(false);
//     }
//   }, [product]);

//   const {
//     id,
//     images,
//     name,
//     priceDiscount,
//     priceRegular,
//     screen,
//     capacity,
//     ram,
//   } = product;

//   const withDiscount = [...product].sort((a, b) => {
//     const discountA = a.priceRegular - a.priceDiscount;
//     const discountB = b.priceRegular - b.priceDiscount;

//     return discountB - discountA;
//   });

//   return (
//     <div className={styles.containerHotPrice}>
//       <h2 className={styles.hotPrice}>Hot prices</h2>
//       <div className={styles.buttonsGroup}>
//         <button className={styles.buttonNewModels} id="hot-prev-button">
//           <img
//             src="/img/left.svg"
//             alt="left"
//             className={styles.newModelsGroup}
//           />
//         </button>
//         <button className={styles.buttonNewModels} id="hot-next-button">
//           <img
//             src="/img/right.svg"
//             alt="right"
//             className={styles.newModelsImg}
//           />
//         </button>
//       </div>
//       <div className={styles.swiperContainer}>
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={16}
//           slidesPerView={4}
//           pagination={{
//             clickable: true,
//           }}
//           breakpoints={{
//             320: { slidesPerView: 2, spaceBetween: 16 },
//             640: { slidesPerView: 3, spaceBetween: 16 },
//             1200: { slidesPerView: 4, spaceBetween: 16 },
//           }}
//           loop={false}
//           className={styles.swiperNewBlock}
//           navigation={{
//             prevEl: '#hot-prev-button',
//             nextEl: '#hot-next-button',
//           }}
//         >
//           {withDiscount.length > 0 &&
//             withDiscount.map(singleProduct => (
//               <SwiperSlide key={singleProduct.id}>
//                 <article className={styles.cartHotPrice}>
//                   <Link
//                     to={`/${singleProduct.category}/${singleProduct.id}`}
//                     className={styles.productCart}
//                   >
//                     <img className={styles.cardPhoto} src={images} alt={name} />
//                     <h2 className={styles.productName}>{name}</h2>
//                     <div className={styles.cardDiscount}>${priceDiscount}</div>
//                     <div className={styles.cardRegular}>${priceRegular}</div>
//                     <div className={styles.cardSpes}>
//                       <div className={styles.screen}>
//                         <span>Screen</span>
//                         <strong className={styles.strong}>{screen}</strong>
//                       </div>
//                       <div className={styles.capacity}>
//                         <span>Capacity</span>
//                         <strong className={styles.strong}>{capacity}</strong>
//                       </div>
//                       <div className={styles.ram}>
//                         <span>Ram</span>
//                         <strong className={styles.strong}>{ram}</strong>
//                       </div>
//                     </div>
//                   </Link>
//                   <div className={styles.actions}>
//                     <button className={styles.cardToAdd}>Add to cart</button>
//                     <button className={styles.buttonToFavorites}>
//                       <img
//                         src="/img/favorites.svg"
//                         className={styles.iconImgFavorites}
//                         alt="Favourites"
//                       />
//                     </button>
//                   </div>
//                 </article>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };
