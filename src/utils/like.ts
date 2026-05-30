export const handleLike = (productId: string) => {
  const likedRaw = localStorage.getItem('likedProducts');
  let liked: string[] = likedRaw ? JSON.parse(likedRaw) : [];

  if (liked.includes(productId)) {
    liked = liked.filter(id => id !== productId);
  } else {
    liked.push(productId);
  }

  localStorage.setItem('likedProducts', JSON.stringify(liked));
};

export const getLikes = () => {
  const likedRaw = localStorage.getItem('likedProducts');
  const liked: string[] = likedRaw ? JSON.parse(likedRaw) : [];

  return liked;
};

// export const isProductInFavorites = (productId: string) => {
//   const likedRaw = localStorage.getItem('likedProducts');
//   const liked: string[] = likedRaw ? JSON.parse(likedRaw) : [];

//   return liked.includes(productId);
// };
