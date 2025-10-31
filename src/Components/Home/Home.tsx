import { Link } from 'react-router-dom';
import './Home.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const pageBanners = [
  { image: '/img/banners/Banner.png', link: '/phones' },
  { image: 'https://i.imgur.com/RgR1JJm.png', link: '/tablets' },
  { image: 'img/banners/banner-accessories.png', link: '/accessories' },
];

export const Home: React.FC = () => {
  const [currentwidth, setCurrentWidth] = useState(window.innerWidth);
  const [banners] = useState(pageBanners);
  const [currentPage, setCurrentPage] = useState(1);
  const [bannersPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    setCurrentPage(1);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const lastBannerIndex = currentPage * bannersPerPage;
  const firstBannerIndex = lastBannerIndex - bannersPerPage;
  const currentBanner = banners.slice(firstBannerIndex, lastBannerIndex);

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(3 / bannersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () =>
    setCurrentPage(prev => {
      if (currentPage === pageNumbers.length) {
        return 1;
      }

      return prev + 1;
    });

  const previousPage = () =>
    setCurrentPage(prev => {
      if (currentPage === 1) {
        return pageNumbers.length;
      }

      return prev - 1;
    });

  return (
    <div className="home">
      {+currentwidth > 639 ? (
        <div className="home__wrapper">
          <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

          <div className="home__banner--box">
            <div className="home__slider-button" onClick={previousPage}>
              <img src="/img/ui-kit/chevron-arrow-left.png" alt="button" />
            </div>

            {currentBanner.map(banner => (
              <Link to={banner.link} key={banner.image}>
                <img src={banner.image} alt="banner" className="home-banner" />
              </Link>
            ))}

            <div className="home__slider-button--left" onClick={nextPage}>
              <img src="/img/ui-kit/chevron-arrow-left.png" alt="button" />
            </div>
          </div>

          <div className="home-banners__pagination">
            {pageNumbers.map(number => (
              <div
                key={number}
                className={classNames('paginate-button', {
                  'active-pagination': currentPage === number,
                })}
                onClick={() => paginate(number)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="home__wrapper">
          <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

          <Link to="/phones">
            <img
              src="/img/banners/mobileBanner-phones.png"
              alt="banner"
              className="home-banner"
            />
          </Link>
        </div>
      )}
    </div>
  );
};
