import './App.scss';
import { ProductSlider } from './components/ProductSlider';
import { Product } from './types/product';

const App = () => {
  const product: Product = {
    age: 1,
    id: '111',
    type: 'phone',
    imageUrl: 'https://s3-alpha-sig.figma.com/img/2fd7/ac9a/6c05b'
    + '192e9d229d5e415bad59e64ac49?Expires=1694390400&Signa'
    + 'ture=jOwvvJRZCOKxstpD65rGXSiqUOylffYJVLL56EavHM3Equp'
    + 'vKhqLZ5Y2zC-D4mnfyOWL7BO5p6nMNbTxg~Altl9FbWfjjoZXBGS'
    + 'Uw3AADjlZr-DzGnY9YcFv1qFbd3n6GgQkgIGyGkPkWpbRqSmyeJQ'
    + 'MXiWpbx4ch6sXAC34kDgzPtF35BuwJSAZ3rk7JP9MSXeZMu9i16f'
    + 'qe8zs4IXGxRa~t36rQ~WYG1JtV9L-LLKOoZnG-NuWJjSUXRR3DZZ'
    + 'yNZ9BP~O9jHZRTnOIlmjmmGkmLFDI9Uzqiq9ydALXvICZUXcXySI'
    + 'P8U~t-BTrJ2MhVWGNakTvDVbsPw1KlxWoSQ__&Key-Pair-Id=AP'
    + 'KAQ4GOSFWCVNEHN3O4',
    name: 'Iphone',
    snippet: 'aaa',
    price: 700,
    discount: 0,
    screen: 'Some screen',
    capacity: 'Some capacity',
    ram: 'Some ram',
  };

  const products
    = [product,
      product,
      product,
      product,
      product,
      product,
      product,
      product,
      product,
    ];

  return (
    <div className="App">
      <ProductSlider title="Hot prices" products={products} />
    </div>
  );
};

export default App;
