import ReactDOM from 'react-dom';
import { Root } from './Root';
import { CartProvider } from './context/CartContext';
import './index.scss';
import { FavouritesProvider } from './context/FavouritesContext';

ReactDOM.render(
  <CartProvider>
    <FavouritesProvider>
      <Root />
    </FavouritesProvider>
  </CartProvider>,
  document.getElementById('root'),
);

// import { createRoot } from 'react-dom/client';
// import { ProductProvider } from './helpers/ProductsContext';
// import { Root } from './Root';
// import './index.scss';

// createRoot(document.getElementById('root') as HTMLDivElement)
//   .render(
//     <ProductProvider>
//       <Root />
//     </ProductProvider>,
//   );
