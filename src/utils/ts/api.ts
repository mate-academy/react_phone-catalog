export const getBannerSlides = () => {
  return fetch('../../api/banner.json').then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};
