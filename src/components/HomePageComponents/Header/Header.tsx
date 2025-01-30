import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

enum Sides {
  right = 'right',
  left = 'left',
}

export const Header = () => {
  const desktopBanners = [1, 2, 3].map(num => `Banner-${num}.png`);
  const phoneBanners = [1, 2, 3].map(num => `slider-${num}.png`);

  const [banners, setBanners] = useState<string[]>(desktopBanners);
  const [activeImg, setActiveImg] = useState(banners[0]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateBanners = () => {
    const newBanners = window.innerWidth <= 640 ? phoneBanners : desktopBanners;

    setBanners(newBanners);
    setActiveImg(newBanners[0]);
  };

  useEffect(() => {
    updateBanners();
    window.addEventListener('resize', updateBanners);

    return () => {
      window.removeEventListener('resize', updateBanners);
    };
  }, []);

  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setActiveImg(prevImg => {
        const currentIndex = banners.indexOf(prevImg);
        const nextIndex = (currentIndex + 1) % banners.length;

        return banners[nextIndex];
      });
    }, 5000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeImg]);

  const handleButtonSlide = (side: Sides) => {
    setActiveImg(prevImg => {
      const currentIndex = banners.indexOf(prevImg);
      const newIndex =
        side === Sides.right
          ? (currentIndex + 1) % banners.length
          : (currentIndex - 1 + banners.length) % banners.length;

      return banners[newIndex];
    });
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__title-block">
          <h1 className="header__title">
            Welcome to Nice <br className="header__title--br" /> Gadgets store!
          </h1>
        </div>
        <div className="header__sliders">
          <div
            className="header__sliders-button header__sliders-button--left"
            onClick={() => handleButtonSlide(Sides.left)}
          >
            <div className="icon icon--array--left--light"></div>
          </div>
          <div
            className="header__sliders-button header__sliders-button--right"
            onClick={() => handleButtonSlide(Sides.right)}
          >
            <div className="icon icon--array--right--light"></div>
          </div>

          <div className="header__sliders__photo-container">
            <img
              src={`./img/${activeImg}`}
              alt={`slider-img-${activeImg}`}
              className="header__sliders--photo"
            />
          </div>

          <div className="header__sliders--indicators-block">
            {banners.map(banner => (
              <div className="header__sliders--indicator-block" key={banner}>
                <div
                  className={cn('header__sliders--indicator', {
                    'header__sliders--indicator--is-active':
                      banner === activeImg,
                  })}
                  onClick={() => setActiveImg(banner)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
