const Loader = () => {
  return (
    <div className="scene">
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-faces">
            <div className="cube-face shadow" />
            <div className="cube-face top" />
            <div className="cube-face front" />
            <div className="cube-face back" />
            <div className="cube-face right" />
            <div className="cube-face left" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
