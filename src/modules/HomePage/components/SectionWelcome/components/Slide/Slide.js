import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './styles.module.scss';
import classNames from 'classnames';
export const Slide = ({ textButton, paragraph, textTitle, textTitle2, alt, imageMax640, image, ...props }) => {
    return (_jsxs("div", { ...props, className: styles.slide, children: [_jsxs("div", { className: styles.leftContainer, children: [_jsx("h2", { className: styles.title, children: textTitle }), _jsx("p", { className: styles.paragraph, children: paragraph }), _jsx("button", { className: styles.button, children: textButton })] }), _jsxs("div", { className: styles.rightContainer, children: [_jsx("h2", { className: classNames(styles.title2), children: textTitle2 }), _jsxs("picture", { className: classNames(styles.image), children: [_jsx("source", { media: "(max-width: 640px)", srcSet: imageMax640 }), _jsx("img", { src: image, alt: alt, loading: "lazy" })] })] }), _jsx("button", { className: classNames(styles.button, styles.button2), children: textButton })] }));
};
