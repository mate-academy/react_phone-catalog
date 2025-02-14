import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { ArrowIcon } from '../Icons/Arrow';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  pages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const SLIDES_GAP = 8;

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const swiper = useSwiper();

  const [pagesList, setPagesList] = useState<number[]>([]);

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === pages;

  const pageArray = () => {
    const pagesNums: number[] = [];

    for (let i = 1; i <= pages; i++) {
      pagesNums.push(i);
    }

    setPagesList(pagesNums);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    pageArray();
  }, [pages]);

  return (
    <div className={styles.pagination}>
      <button
        className="toggle button backBtn prevPage"
        disabled={currentPage === 1}
        onClick={() => swiper.slidePrev()}
      >
        <span className="icon">
          <ArrowIcon disabled={prevDisabled} />
        </span>
      </button>

      <div className={styles.numbersList}>
        <Swiper
          slidesPerView={4}
          spaceBetween={SLIDES_GAP}
          navigation={{
            nextEl: '.nextPage',
            prevEl: '.prevPage',
          }}
          modules={[Navigation]}
          onSlideChange={s => setCurrentPage(s.activeIndex + 1)}
        >
          {pagesList.map(number => (
            <SwiperSlide key={number}>
              <button
                className={classNames('button pageToggle', {
                  'pageToggle-active': currentPage === number,
                })}
                onClick={() => handlePageChange(number)}
              >
                <span className={styles.pageButton}>{number}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        className="toggle button nextPage"
        disabled={currentPage === pages}
        onClick={() => swiper.slidePrev()}
      >
        <span className="icon">
          <ArrowIcon disabled={nextDisabled} />
        </span>
      </button>
    </div>
  );
};
