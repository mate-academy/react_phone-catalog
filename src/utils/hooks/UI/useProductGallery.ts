import { useEffect, useRef, useState } from 'react';

export const useProductGallery = (images: string[]) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryHeight, setGalleryHeight] = useState<number | null>(null);

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const photo = photoRef.current;

    if (!photo) {
      return;
    }

    const isTabletOrDesktop = () =>
      window.matchMedia('(min-width: 640px)').matches;

    if (!isTabletOrDesktop()) {
      setGalleryHeight(null);

      return;
    }

    const observer = new ResizeObserver(entries => {
      setGalleryHeight(entries[0].contentRect.height);
    });

    observer.observe(photo);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) {
      return;
    }

    const activeThumb = gallery.children[activeImageIndex] as HTMLElement;

    activeThumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeImageIndex]);

  useEffect(() => {
    const img = photoRef.current;

    if (!img) {
      return;
    }

    let startX = 0;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;

      if (Math.abs(diff) < 50) {
        return;
      }

      setActiveImageIndex(i =>
        diff > 0 ? Math.min(i + 1, images.length - 1) : Math.max(i - 1, 0),
      );
    };

    img.addEventListener('touchstart', onStart);
    img.addEventListener('touchend', onEnd);

    return () => {
      img.removeEventListener('touchstart', onStart);
      img.removeEventListener('touchend', onEnd);
    };
  }, [images.length]);

  return {
    activeImageIndex,
    setActiveImageIndex,
    galleryHeight,
    galleryRef,
    photoRef,
  };
};
