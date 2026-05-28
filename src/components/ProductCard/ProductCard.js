import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
// import { ButtonHeart } from '../ButtonHeart/ButtonHeart';
import { ButtonBuy } from '../ButtonBuy/ButtonBuy';
import { useCart } from '@/app/providers/Cart';
import { Link } from 'react-router-dom';
import { useFavourites } from '@/app/providers/Favorities';
import { ButtonHeart } from '../ButtonSecond copy/ButtonHeart';
export const ProductCard = ({ phone, ...props }) => {
    const { t } = useTranslation();
    const { favourites, setFavourites } = useFavourites();
    const { cart, setCart } = useCart();
    const isFavourite = useMemo(() => favourites.includes(phone.id), [favourites, phone.id]);
    const isInCart = useMemo(() => cart.includes(phone.id), [cart, phone.id]);
    return (_jsx("article", { ...props, className: styles.main, "aria-label": phone.name, children: _jsxs("div", { className: styles.content, children: [_jsx(Link, { to: 'phones/' + phone.id, children: _jsx("img", { className: styles.image, src: phone.images[0], alt: phone.name + ' image', loading: "lazy" }) }), _jsx(Link, { to: 'phones/' + phone.id, children: _jsx("h4", { className: styles.title, children: phone.name }) }), _jsx("h3", { className: styles.price, children: '$' + phone.priceRegular }), _jsx("div", { className: styles.line }), _jsxs("div", { className: styles.details, children: [_jsxs("div", { className: styles.detail, children: [_jsx("p", { className: styles.detailText1, children: t('productCart.screen') }), _jsx("p", { className: styles.detailText2, children: phone.screen })] }), _jsxs("div", { className: styles.detail, children: [_jsx("p", { className: styles.detailText1, children: t('productCart.capacity') }), _jsx("p", { className: styles.detailText2, children: phone.capacity })] }), _jsxs("div", { className: styles.detail, children: [_jsx("p", { className: styles.detailText1, children: t('productCart.RAM') }), _jsx("p", { className: styles.detailText2, children: phone.ram })] })] }), _jsxs("div", { className: styles.buttons, children: [_jsx(ButtonBuy, { className: styles.buttonBuy, selected: isInCart, onClick: () => {
                                setCart((prev) => prev.includes(String(phone.id))
                                    ? prev.filter((id) => id !== String(phone.id))
                                    : [...prev, String(phone.id)]);
                            }, children: isInCart ? t('productCart.buttonSelected') : t('productCart.button') }), _jsx(ButtonHeart, { className: styles.buttonHeart, like: isFavourite, onClick: () => {
                                setFavourites((prev) => prev.includes(String(phone.id))
                                    ? prev.filter((id) => id !== String(phone.id))
                                    : [...prev, String(phone.id)]);
                            } })] })] }) }));
};
