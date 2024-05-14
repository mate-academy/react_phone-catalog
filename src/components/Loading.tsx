import { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState('#ffffff');

  return (
    <div className="sweet-loading">
      <button type="button" onClick={() => setLoading(!loading)}>
        Toggle Loader
      </button>
      <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder="Color of the loader"
      />

      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
