// (Приклад використання)
import React from 'react';
import useFavoritesStore from './stores/useFavoritesStore';
import useCartStore from './stores/useCartStore';

// Припустимо, у нас є кілька тестових продуктів
const sampleProducts = [
  { id: 'p1', name: 'Смартфон X', price: 500, image: '/img/p1.webp' },
  { id: 'p2', name: 'Планшет Y', price: 700, image: '/img/p2.webp' },
  { id: 'p3', name: 'Навушники Z', price: 100, image: '/img/p3.webp' },
];

function App() {
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavoritesStore();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Секція товарів */}
      <div style={{ border: '1px solid #ccc', padding: '15px', flex: 1 }}>
        <h2>Доступні товари</h2>
        {sampleProducts.map(product => (
          <div
            key={product.id}
            style={{
              marginBottom: '10px',
              padding: '5px',
              borderBottom: '1px dotted #eee',
            }}
          >
            <h3>
              {product.name} - ${product.price}
            </h3>
            <img
              src={product.image}
              alt={product.name}
              width="50"
              height="50"
              style={{ marginRight: '10px' }}
            />
            <button onClick={() => addToCart(product)}>Додати до кошика</button>
            <button
              onClick={() =>
                isFavorite(product.id)
                  ? removeFavorite(product.id)
                  : addFavorite(product)
              }
              style={{
                marginLeft: '10px',
                backgroundColor: isFavorite(product.id)
                  ? 'lightcoral'
                  : 'lightgreen',
              }}
            >
              {isFavorite(product.id)
                ? 'Видалити з улюблених'
                : 'Додати в улюблені'}
            </button>
          </div>
        ))}
      </div>

      {/* Секція улюблених */}
      <div style={{ border: '1px solid #ccc', padding: '15px', flex: 1 }}>
        <h2>Улюблені ({favorites.length})</h2>
        {favorites.length === 0 ? (
          <p>Поки що немає улюблених товарів.</p>
        ) : (
          <ul>
            {favorites.map(item => (
              <li key={item.id} style={{ marginBottom: '5px' }}>
                {item.name}
                <button
                  onClick={() => removeFavorite(item.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Секція кошика */}
      <div style={{ border: '1px solid #ccc', padding: '15px', flex: 1 }}>
        <h2>Кошик ({getTotalItems()} одиниць)</h2>
        {cartItems.length === 0 ? (
          <p>Кошик порожній.</p>
        ) : (
          <>
            <ul>
              {cartItems.map(item => (
                <li
                  key={item.id}
                  style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width="30"
                    height="30"
                    style={{ marginRight: '10px' }}
                  />
                  {item.name} (${item.price}) x {item.quantity}
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    +
                  </button>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: '10px',
                      backgroundColor: 'lightcoral',
                    }}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
            <p>Загальна вартість: **${getTotalPrice().toFixed(2)}**</p>
            <button
              onClick={clearCart}
              style={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '10px',
              }}
            >
              Очистити кошик
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
