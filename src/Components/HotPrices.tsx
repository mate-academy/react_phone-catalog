import '../style/main.scss';
import { ProductCard } from './ProductCard';

export const HotPrices = () => {
  return (
    <div className="container--hot">
      <div className="hot__prices">
        <h1>Hot prices</h1>

        <div className="button__container">
          <button
            type="button"
            aria-label="Mute volume"
            className="button button__left"
          />
          <button
            type="button"
            aria-label="Mute volume"
            className="button button__right"
          />
        </div>
      </div>

      <ProductCard />

    </div>
  );
};
