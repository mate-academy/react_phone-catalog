import React, { useState, useEffect, useRef } from 'react';
import './Banner.scss';
import { getImgUrl } from '../../utils/getImgUrl';

export function Banner() {
  const banners = [
    getImgUrl('img/banner-accessories.png'),
    getImgUrl('img/banner-phones.png'),
    getImgUrl('img/banner-tablets.png'),
  ];

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const duration = 5000;

  const cancelAnim = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const startProgress = () => {
    cancelAnim();
    setProgress(0);
    progressRef.current = 0;
    startRef.current = performance.now();

    const animate = (time: number) => {
      if (!startRef.current) {
        startRef.current = time;
      }

      const elapsed = time - startRef.current!;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      progressRef.current = newProgress;
      setProgress(newProgress);

      if (newProgress < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(prev => (prev + 1) % banners.length);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgress();

    return () => cancelAnim();
  }, [current]);

  const goTo = (index: number) => {
    cancelAnim();
    setCurrent((index + banners.length) % banners.length);
    setProgress(0);
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  return (
    <div className="slider">
      <div className="slides-wrapper">
        <div className="side-panel side-left" onClick={prev}>
          <button className="side-btn">‹</button>
        </div>

        <div className="slides" style={{ height: 400 }}>
          {banners.map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`banner-${index}`}
              className={`slide ${index === current ? 'active' : ''}`}
              draggable={false}
            />
          ))}
        </div>

        <div className="side-panel side-right" onClick={next}>
          <button className="side-btn">›</button>
        </div>
      </div>

      <div className="dots">
        {banners.map((_, index) => (
          <div
            key={index}
            className="dot-container"
            onClick={() => goTo(index)}
          >
            <span className={`dot ${index === current ? 'active' : ''}`}>
              {index === current && (
                <span className="progress" style={{ width: `${progress}%` }} />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
