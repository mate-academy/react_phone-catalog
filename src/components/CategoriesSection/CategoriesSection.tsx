import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { CategoriesSectionSkeleton } from './CategoriesSectionSkeleton';
import bookImg from './book white.png';
import kindleImg from './kindel (1).png';
import tabletImg from './tablet3.png';

const CATEGORIES = [
  {
    label: 'categories.paperBooks',
    path: '/paper',
    image: bookImg,
  },
  {
    label: 'categories.audioBooks',
    path: '/audiobook',
    image: tabletImg,
  },
  {
    label: 'categories.kindleBooks',
    path: '/kindle',
    image: kindleImg,
  },
];

export const CategoriesSection = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeGrab, setActiveGrab] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const lastX = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!isDragging.current || activeGrab === null) return;

      if (lastX.current === null) {
        lastX.current = event.clientX;
        return;
      }

      const deltaX = event.clientX - lastX.current;
      lastX.current = event.clientX;

      const sensitivity = 3;

      setRotation((prev) => {
        const next = prev + deltaX / sensitivity;

        if (next > 65) return 65;
        if (next < -65) return -65;

        return next;
      });
    };

    const handleUp = () => {
      isDragging.current = false;
      lastX.current = null;
      setActiveGrab(null);
      setRotation(0);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [activeGrab]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <CategoriesSectionSkeleton />;

  return (
    <section className="flex flex-col mt-[56px] px-4 gap-6 sm:px-6 lg:mt-[80px] lg:w-[1136px] lg:mx-auto lg:px-0 select-none">
      <h2 className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
        {t('categories.shopByCategory')}
      </h2>

      <div className="flex flex-row mt-[56px] items-center items-end mx-auto">
        {CATEGORIES.map((cat, index) => (
          <Link
            key={cat.path}
            to={cat.path}
            className={cn(
              'group relative transition-all duration-300 text-center',
              activeGrab === index ? 'cursor-grabbing' : 'cursor-grab',
            )}
            style={{
              marginLeft: index !== 0 ? '-110px' : undefined,
              zIndex: activeGrab === index ? 50 : CATEGORIES.length - index,
            }}
          >
            <div
              className="rounded-2xl "
              id={`img-box-${index}`}
              onMouseDown={(e) => {
                e.preventDefault();
                setActiveGrab(index);
                isDragging.current = true;
                lastX.current = e.clientX;
              }}
              style={{
                transformOrigin: 'bottom left',
                transform:
                  activeGrab === index ?
                    `rotate(${rotation}deg)`
                  : 'rotate(0deg)',
                transition:
                  activeGrab === null ? 'transform 0.5s ease-out' : 'none',
                cursor: activeGrab === index ? 'grabbing' : 'grab',
              }}
            >
              <img
                src={cat.image}
                alt={t(cat.label)}
                draggable={false}
                className="overflow-hidden sm:w-[290px]  object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-row gap-4 sm:gap-8 mx-auto">
        {CATEGORIES.map((cat) => (
          <h3
            key={cat.path}
            className={cn(TYPOGRAPHY.h4, 'text-foreground text-center')}
          >
            {t(cat.label)}
          </h3>
        ))}
      </div>
    </section>
  );
};
