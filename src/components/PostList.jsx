import React, { useEffect } from 'react';
import usePostStore from '../stores/usePostStore'; // Шлях до вашого стору
import { ProductCard } from './ProductCard/ProductCard';

function PostList() {
  const { posts, isLoading, error, fetchPosts, clearPosts } = usePostStore();

  // Використовуємо useEffect для завантаження даних при монтуванні компонента
  useEffect(() => {
    fetchPosts();
    // Очищаємо пости при розмонтуванні компонента (необов'язково, для демонстрації)

    return () => {
      clearPosts();
    };
  }, [fetchPosts, clearPosts]); // Залежності: fetchPosts та clearPosts, щоб useEffect не попереджав

  if (isLoading) {
    // eslint-disable-next-line react/jsx-filename-extension
    return <p>Завантаження постів...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Помилка: {error}</p>;
  }

  return (
    <div>
      <h1>Список постів</h1>
      {posts.length === 0 ? (
        <p>Немає постів для відображення.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <ProductCard
                imageSrc={`/${post.images[0]}`}
                title={post.name}
                price={post.priceDiscount}
                originalPrice={post.priceRegular}
                screen={post.screen}
                capacity={post.capacity}
                ram={post.ram}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
