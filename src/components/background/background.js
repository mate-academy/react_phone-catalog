import React from 'react';
import { useTrail, animated } from 'react-spring';
import './styles.css';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Goo = () => {
  const [trail, set] = useTrail(3, () => ({
    xy: [0, 0], config: i => (i === 0 ? fast : slow),
  }));

  return (
    <>
      <svg
        className="goo-svg"
        style={{
          position: 'absolute', width: 0, height: 0,
        }}
      >
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation="30"
          />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />
        </filter>
      </svg>
      <div
        className="hooks-main"
        onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}
      >
        {trail.map((props, index) => (
          <animated.div
          /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            /* eslint-disable-next-line react/prop-types */
            style={{ transform: props.xy.interpolate(trans) }}
          />
        ))}
      </div>
    </>
  );
};

export default Goo;
