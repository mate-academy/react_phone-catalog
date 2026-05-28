import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './App.scss';
import { Header } from '@/modules/Header';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './app/providers/Theme';
import { PhonesProvider } from './app/providers/Phones/PhoneContext';
import { CartProvider } from './app/providers/Cart';
import { FavouritesProvider } from './app/providers/Favorities';
export const App = () => {
    // const [count, setCount] = useState(0);
    return (_jsx(_Fragment, { children: _jsx(ThemeProvider, { children: _jsx(CartProvider, { children: _jsx(FavouritesProvider, { children: _jsxs(PhonesProvider, { children: [_jsx(Header, {}), _jsx(Outlet, {})] }) }) }) }) }));
};
export default App;
