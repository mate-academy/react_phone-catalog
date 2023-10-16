type CounterProps = {
  count: number
};

export const Counter = ({ count }: CounterProps) => (
  <div className="image-link__counter counter">
    <span className="counter__text">{count}</span>
  </div>
);
