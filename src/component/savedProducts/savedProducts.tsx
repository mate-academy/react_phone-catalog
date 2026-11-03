import './savedProducts.scss';
import cartIsEmpty from '../../../public/img/cart-is-empty.png';
import { Link } from 'react-router-dom';
import {
  importCookie,
  getQuantidade,
  deleteCookie,
  addOrDeleteProduct,
} from '../cookie';
import { Product } from '../../interface';
import { useState, useEffect } from 'react';
export const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState<Product[] | null>([]);

  const getCookie = () => {
    const products = importCookie('cart');

    setSavedProducts(products);
  };

  useEffect(() => {
    getCookie();
  }, []);

  return (
    <>
      <main className="cart-page">
        <div className="cart-container">
          <Link to="/home" className="cart-back">
            ‹ Back
          </Link>

          <h1 className="cart-title">Cart</h1>

          <div className="cart-layout">
            <section className="cart-items">
              {savedProducts?.length > 0 ? (
                <>
                  {savedProducts
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map(product => (
                      <article className="cart-item" key={product.itemId}>
                        <button
                          className="cart-remove"
                          onClick={() => {
                            deleteCookie('cart', product.id);
                            getCookie();
                          }}
                        >
                          x
                        </button>
                        <div className="cart-product-image">
                          <img src={product.image} alt="iPhone 14 Midnight" />
                        </div>
                        <h2 className="cart-product-name">{product.name}</h2>
                        <div className="cart-quantity">
                          <button
                            onClick={() => {
                              if (
                                Number(getQuantidade('cart', product.id)) !== 1
                              ) {
                                addOrDeleteProduct(
                                  product,
                                  'cart',
                                  product.id,
                                  getQuantidade('cart', product.id),
                                  'delete',
                                );
                              } else {
                                deleteCookie('cart', product.id);
                              }

                              getCookie();
                            }}
                          >
                            −
                          </button>
                          <span>
                            {getQuantidade('cart', product.id) === 1
                              ? '1'
                              : getQuantidade('cart', product.id)}
                          </span>
                          <button
                            onClick={() => {
                              addOrDeleteProduct(
                                product,
                                'cart',
                                product.id,
                                getQuantidade('cart', product.id),
                                'add',
                              );
                              getCookie();
                            }}
                          >
                            +
                          </button>
                        </div>
                        <strong className="cart-item-price">
                          R$
                          {product.price *
                            Number(getQuantidade('cart', product.id))}
                          ,00
                        </strong>
                      </article>
                    ))}

                  <aside className="cart-summary">
                    <h2>
                      R$
                      {savedProducts?.reduce(
                        (soma, usuario) =>
                          soma +
                          usuario.price *
                            Number(getQuantidade('cart', usuario.id)),
                        0,
                      )}
                      ,00
                    </h2>
                    <p>Total Products {savedProducts?.length}</p>

                    <div className="cart-summary-divider"></div>

                    <button
                      className="cart-checkout"
                      onClick={() => alert('Não possui compra nesse site')}
                    >
                      Finalizar compra
                    </button>

                    <Link to="/" className="cart-continue">
                      Continuar comprando
                    </Link>
                  </aside>
                </>
              ) : (
                <div className="cart-empty">
                  <img
                    src={cartIsEmpty}
                    alt="Carrinho vazio"
                    className="cart-empty-image"
                  />
                  <h2>Your cart is empty</h2>
                  <p>Adicione alguns produtos ao seu carrinho para começar.</p>
                  <Link to="/" className="cart-empty-btn">
                    Voltar para a Loja
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};
