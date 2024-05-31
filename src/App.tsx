import './App.module.scss';
import { ActionButtons } from './components/ActionButtons';
import { Loader } from './components/Loader/Loader';

export const App = () => (
  <div className="App">
    <h1>This webiste is under construction...</h1>
    <Loader />
    <ActionButtons />
  </div>
);
