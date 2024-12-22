const getStylesShop = (index: number, windowWidth: number) => {
  if (windowWidth <= 360) {
    return {
      animationDelay: index === 2 ? '2s' : index === 1 ? '1.5s' : '1s',
      width: index === 2 ? '280%' : '150%',
      padding: index === 2 ? '64px 0 0 300px' : '120px 0 0 100px',
    };
  } else if (windowWidth >= 360 && windowWidth < 500) {
    return {
      animationDelay: index === 2 ? '2s' : index === 1 ? '1.5s' : '1s',
      width: index === 2 ? '150%' : '100%',
      padding: index === 2 ? '130px 0 0 150px' : '130px 0 0 50px',
    };
  } else if (windowWidth >= 500 && windowWidth < 640) {
    return {
      animationDelay: index === 2 ? '2s' : index === 1 ? '1.5s' : '1s',
      width: index === 2 ? '120%' : '80%',
      padding: index === 2 ? '124px 0 0 130px' : '130px 0 0 50px',
    };
  } else if (windowWidth >= 640 && windowWidth < 680) {
    return {
      animationDelay: index === 2 ? '2s' : index === 1 ? '1.5s' : '1s',
      width: index === 2 ? '300%' : '170%',
      padding: index === 2 ? '70px 0 0 200px' : '115px 0 0 70px',
    };
  } else if (windowWidth >= 680 && windowWidth < 780) {
    return {
      animationDelay: index === 2 ? '2s' : index === 1 ? '1.5s' : '1s',
      width: index === 2 ? '290%' : '150%',
      padding: index === 2 ? '70px 0 0 220px' : '100px 0 0 60px',
    };
  } else if (windowWidth >= 780 && windowWidth < 880) {
    return {
      animationDelay: index === 2 ? '2s' : index === 1 ? '1.5s' : '1s',
      width: index === 2 ? '250%' : '150%',
      padding: index === 2 ? '70px 0 0 200px' : '150px 0 0 70px',
    };
  } else if (windowWidth >= 880) {
    return {
      animationDelay: index === 2 ? '2s' : index === 1 ? '1.5s' : '1s',
      width: index === 2 ? '230%' : '150%',
      padding: index === 2 ? '80px 0 0 200px' : '180px 0 0 80px',
    };
  }

  return {};
};

export default getStylesShop;
