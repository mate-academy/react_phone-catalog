import './App.scss';
import { Pagination } from './components/Pagination';

const App = () => {
  return (
    <div className="App">
      <Pagination total={43} />
    </div>
  );
};

export default App;
