import { useEffect, useState } from 'react';
import { getProducts } from '../../../../utils/fetchProducts';
import styles from './AddForm.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/data';
import { Fav } from '../../../../components/Icons/Favourite/Fav';
import { AddButton } from '../../../../components/AddButton/AddButton';

type Props = {
  colors: string[];
  capacities: string[];
  clearId: string;
  currentColor: string;
  currentCapacity: string;
  resolution: string;
  processor: string;
};

export const AddForm: React.FC<Props> = ({
  colors,
  capacities,
  clearId,
  currentColor,
  currentCapacity,
  resolution,
  processor,
}) => {
  const [productId, setProductId] = useState(0);
  const [product, setProduct] = useState<Product>();
  const rightColors = colors.map(c => {
    if (c === 'spacegray') {
      return 'gray';
    } else {
      return c;
    }
  });

  useEffect(() => {
    getProducts()
      .then(result => {
        const item = result.find(r => {
          const fullId =
            clearId + '-' + currentCapacity.toLowerCase() + '-' + currentColor;

          return r.itemId === fullId;
        });

        if (item) {
          setProductId(item.id);
          setProduct(item);
        }
      })
      .catch(() => setProductId(0));
  }, [clearId, currentColor, currentCapacity]);

  return (
    <div className={classNames(styles.add)}>
      <span className={classNames(styles.add__id)}>ID: {productId}</span>
      <div className={classNames(styles.add__container)}>
        <div className={classNames(styles.add__main)}>
          <div className={classNames(styles.add__parameter)}>
            <span className={classNames(styles['add__parameter-title'])}>
              Available colors
            </span>
            <div className={classNames(styles.add__values)}>
              {rightColors.map((c, i) => (
                <Link
                  to={`../${clearId + '-' + currentCapacity.toLowerCase() + '-' + colors[i]}`}
                  key={i}
                  className={classNames(
                    styles.add__value,
                    styles['add__value--color'],
                    {
                      [styles['add__value--color-active']]:
                        colors[i] === currentColor,
                    },
                  )}
                >
                  <div
                    className={classNames(styles['add__value--color-inner'])}
                    style={{ backgroundColor: c }}
                  ></div>
                </Link>
              ))}
            </div>
          </div>
          <div className={classNames(styles.add__parameter)}>
            <span className={classNames(styles['add__parameter-title'])}>
              Select capacity
            </span>
            <div className={classNames(styles.add__values)}>
              {capacities.map((c, i) => (
                <Link
                  to={`../${clearId + '-' + c.toLowerCase() + '-' + currentColor}`}
                  key={i}
                  className={classNames(
                    styles.add__value,
                    styles['add__value--capacity'],
                    {
                      [styles['add__value--capacity-active']]:
                        c === currentCapacity,
                    },
                  )}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
          <div className={classNames(styles.add__price)}>
            <span className={classNames(styles['add__price--current'])}>
              {'$' + product?.price || 0}
            </span>
            <span className={classNames(styles['add__price--prev'])}>
              {'$' + product?.fullPrice || 0}
            </span>
          </div>
          <div className={classNames(styles.add__buttons)}>
            <AddButton id={productId} />
            <Fav id={productId} />
          </div>
        </div>
        <div className={classNames(styles.add__techspec)}>
          <div className={classNames(styles.add__spec)}>
            <span className={classNames(styles['add__spec-title'])}>
              Screen
            </span>
            <span className={classNames(styles['add__spec-value'])}>
              {product?.screen}
            </span>
          </div>
          <div className={classNames(styles.add__spec)}>
            <span className={classNames(styles['add__spec-title'])}>
              Resolution
            </span>
            <span className={classNames(styles['add__spec-value'])}>
              {resolution}
            </span>
          </div>
          <div className={classNames(styles.add__spec)}>
            <span className={classNames(styles['add__spec-title'])}>
              Processor
            </span>
            <span className={classNames(styles['add__spec-value'])}>
              {processor}
            </span>
          </div>
          <div className={classNames(styles.add__spec)}>
            <span className={classNames(styles['add__spec-title'])}>RAM</span>
            <span className={classNames(styles['add__spec-value'])}>
              {product?.ram}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
