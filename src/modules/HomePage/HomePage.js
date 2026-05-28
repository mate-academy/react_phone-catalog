import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SectionWelcome } from './components/SectionWelcome';
import { SectionHotPrice } from './components/SectionHotPrice';
import styles from './styles.module.scss';
export const HomePage = () => {
    return (_jsxs("main", { className: styles.main, children: [_jsx(SectionWelcome, {}), _jsx(SectionHotPrice, {})] }));
};
