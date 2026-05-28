import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import './styles.css';
// import required modules
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { Slide } from './components/Slide/Slide';
import { Trans, useTranslation } from 'react-i18next';
import { ButtonSecond } from '@/components/ButtonSecond/ButtonSecond';
export const SectionWelcome = () => {
    const swiperRef = useRef(null);
    const { t } = useTranslation();
    useEffect(() => {
        const onResize = () => {
            swiperRef.current?.update();
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return (_jsxs("section", { children: [_jsx("h1", { className: styles.title, children: t('HomeTitle.welcome') }), _jsxs("div", { className: styles.sliderWrapper, children: [_jsx(ButtonSecond, { iconFlipX: true, className: styles.sliderButtonPrev }), _jsxs(Swiper, { onSwiper: (swiper) => {
                            swiperRef.current = swiper;
                        }, slidesPerView: "auto", loop: true, navigation: {
                            prevEl: `.${styles.sliderButtonPrev}`,
                            nextEl: `.${styles.sliderButtonNext}`,
                        }, pagination: {
                            el: `.${styles.customPagination}`,
                            clickable: true,
                        }, autoplay: {
                            delay: 3500,
                            disableOnInteraction: true,
                        }, modules: [Navigation, Autoplay, Pagination], className: styles.mySwiper, children: [_jsx(SwiperSlide, { className: styles.swiperSlide, children: _jsx(Slide, { textButton: t('banners.phone.button'), imageMax640: "img/banners/phone/phone-mb.png", image: "img/banners/phone/phone-tb.png", alt: "Phone image", textTitle: _jsx(Trans, { i18nKey: "banners.phone.title", components: [_jsx("br", {})] }), textTitle2: "iPhone 17", paragraph: t('banners.phone.p') }) }), _jsx(SwiperSlide, { className: styles.swiperSlide, children: _jsx(Slide, { textButton: t('banners.tablets.button'), imageMax640: "img/banners/tablet/tablet-mb.png", image: "img/banners/tablet/tablet-tb.png", alt: "tablet image", textTitle: _jsx(Trans, { i18nKey: "banners.tablets.title", components: [_jsx("br", {})] }), textTitle2: "iPad 11", paragraph: t('banners.tablets.p') }) }), _jsx(SwiperSlide, { className: styles.swiperSlide, children: _jsx(Slide, { textButton: t('banners.accessories.button'), imageMax640: "img/banners/accessories/accessories-mb.png", image: "img/banners/accessories/accessories-tb.png", alt: "accessories image", textTitle: _jsx(Trans, { i18nKey: "banners.accessories.title", components: [_jsx("br", {})] }), textTitle2: "Apple Watch!", paragraph: t('banners.accessories.p') }) })] }), _jsx(ButtonSecond, { className: styles.sliderButtonNext })] }), _jsx("div", { className: styles.customPagination })] }));
};
