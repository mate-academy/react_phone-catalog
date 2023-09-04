import './App.scss';
import { CartTotal } from './components/CartTotal';

const App = () => {
  return (
    <div className="App">
      <CartTotal price={4000} quantity={4} />
    </div>
  );
};

export default App;
