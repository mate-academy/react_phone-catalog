import './App.scss';
import { CartItem } from './components/CartItem';

const App = () => {
  return (
    <div className="App">
      <CartItem price={700} />
    </div>
  );
};

export default App;
