import { useEffect, useState } from 'react';
import './Products.scss';
import { Product } from '../../interface';
import { getApi } from '../../getApi';
import { Link } from 'react-router-dom';
import { deleteCookie, exportCookie, importCookie } from '../cookie';
export const Products = ({ page }: { page: string }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const newProducts = await getApi('products');

        if (page === 'Hot Prices🔥') {
          newProducts.sort(
            (a: Product, b: Product) =>
              b.fullPrice - b.price - (a.fullPrice - a.price),
          );
        } else {
          newProducts.sort((a: Product, b: Product) => b.year - a.year);
        }

        setProducts(newProducts);
      } catch (e) {
        throw new Error('Erro no getData');
      }
    };

    getData();
  });

  return (
    <>
      <h3 className="section-title">{page}</h3>

      <section className="section">
        <div className="products">
          {products?.length > 0 && (
            <>
              {products.map(product => (
                <div className="product" key={product.id}>
                  <Link
                    to={`/productMain?productId=${product.itemId}`}
                    className="link-a"
                  >
                    <div className="porcentProduct">
                      -
                      {Math.ceil(
                        ((product.fullPrice - product.price) /
                          product.fullPrice) *
                          100,
                      )}
                      %
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                    <h3 className="productName">{product.name}</h3>

                    <div className="productPrices">
                      <h4>R$ {product.fullPrice},00</h4>
                      <h3>R$ {product.price},00</h3>
                    </div>

                    <div className="productsList">
                      <li>Screen: {product.screen}</li>
                      <li>Ram: {product.ram}</li>
                      <li>Capacity: {product.capacity}</li>
                      <li>Year: {product.year}</li>
                    </div>
                  </Link>
                  <div className="addDiv">
                    <button
                      className={`addToCart ${importCookie('cart')?.some(r => r.id === product.id) ? 'savedCart' : ''}`}
                      onClick={() => {
                        if (
                          !importCookie('cart')?.some(r => r.id === product.id)
                        ) {
                          exportCookie(product, 'cart', product.id);
                        } else {
                          deleteCookie('cart', product.id);
                        }
                      }}
                    >
                      {importCookie('cart')?.some(r => r.id === product.id)
                        ? 'ADDED TO CART'
                        : 'ADD TO CART'}
                    </button>
                    <button
                      className={`addFavorite ${importCookie('favorities')?.some(r => r.id === product.id) ? 'saved-favorite' : ''}`}
                      onClick={() => {
                        if (
                          !importCookie('favorities')?.some(
                            r => r.id === product.id,
                          )
                        ) {
                          exportCookie(product, 'favorities', product.id);
                        } else {
                          deleteCookie('favorities', product.id);
                        }
                      }}
                    >
                      ADD FAVORITE
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};
