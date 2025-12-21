import './Loader.scss';

export const Loader: React.FC = () => {
  return (
  <div className="orbit-container">
    <div className="orbit-spinner">
      <div className="orbit"></div>
      <div className="orbit"></div>
      <div className="orbit"></div>
    </div>
    <p>Loading gadgets...</p>
  </div>
  );
}
