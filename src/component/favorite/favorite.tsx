import './favorite.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { importCookie, exportCookie, deleteCookie } from '../cookie';
import { Link } from 'react-router-dom';
import { Product } from '../../interface';
export const Favorite = () => {
  const [products, setProducts] = useState<Product[]>();
  const [productsCart, setProductsCart] = useState<Product[]>();

  const getCookies = () => {
    setProductsCart(importCookie('cart'));
    setProducts(importCookie('favorities'));
  };

  useEffect(() => {
    getCookies();
  }, []);

  return (
    <>
      <div className="pages-div">
        <h5>
          <FontAwesomeIcon icon={faHouse} />
          <span>&gt;</span>
          <span>Favorites</span>
        </h5>
      </div>

      <div className="textInformation-div">
        <h1>Favourites</h1>
        <h4>{products?.length || '0'} items</h4>
      </div>
      {products ? (
        <>
          <div className="itenProducts-div">
            {products.map(favoriteProduct => (
              <div className="product" key={favoriteProduct.id}>
                <Link
                  to={`/productMain?productId=${favoriteProduct.itemId}`}
                  className="link-a"
                >
                  <img src={favoriteProduct.image} className="product-image" />

                  <h3 className="productName">{favoriteProduct.name}</h3>

                  <div className="productPrices">
                    <h4>R$ {favoriteProduct.fullPrice},00</h4>
                    <h3>R$ {favoriteProduct.price},00</h3>
                  </div>

                  <div className="productsList">
                    <ul>
                      <li>Screen: {favoriteProduct.screen}</li>
                      <li>RAM: {favoriteProduct.ram}</li>
                      <li>Capacity: {favoriteProduct.capacity}</li>
                      <li>Year: {favoriteProduct.year}</li>
                    </ul>
                  </div>
                </Link>

                <div className="addDiv">
                  <button
                    className={`addToCart ${importCookie('cart')?.some(r => r.id === favoriteProduct.id) ? 'savedCart' : ''}`}
                    onClick={() => {
                      if (
                        !productsCart?.some(r => r.id === favoriteProduct.id)
                      ) {
                        exportCookie(
                          favoriteProduct,
                          'cart',
                          favoriteProduct.id,
                        );
                      } else {
                        deleteCookie('cart', favoriteProduct.id);
                      }

                      getCookies();
                    }}
                  >
                    {productsCart?.some(r => r.id === favoriteProduct.id)
                      ? 'ADDED TO CART'
                      : 'ADD TO CART'}
                  </button>
                  <button
                    className="addFavorite saved-favorite"
                    onClick={() => {
                      deleteCookie('favorities', favoriteProduct.id);
                      getCookies();
                    }}
                  >
                    REMOVE FAVORITE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <h2>No Favourites Products</h2>
          <p>Adicione alguns produtos ao seu carrinho para começar.</p>
          <Link to="/" className="cart-empty-btn">
            Voltar para a Loja
          </Link>
        </div>
      )}
    </>
  );
};
