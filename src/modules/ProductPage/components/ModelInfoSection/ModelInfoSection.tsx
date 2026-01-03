import { Title } from '../../../../components/Title';
import { ModelCharact } from '../../../../components/ModelCharact';
import styles from './ModelInfoSection.module.scss';
import { Model } from '../../../shared/types/Model';

type DescriptionItem = {
  title: string;
  text: string[];
};

type Props =
  | { type: 'about'; data: DescriptionItem[]; model: Model }
  | { type: 'specs'; data: string[]; model: Model };

export const ModelInfoSection: React.FC<Props> = ({ type, data, model }) => {
  return (
    <div className={styles['info-block']}>
      <div className={styles['info-block__title']}>
        <Title text={type === 'about' ? 'About' : 'Tech specs'} level={3} />
      </div>
      {type === 'about' && (
        <div className={styles['info-block__about']}>
          {data.map((item, index) => (
            <div className={styles['info-block__about-content']} key={index}>
              <Title text={item.title} level={4} />

              <div>
                {item.text.map((text, idx) => (
                  <p
                    key={idx}
                    style={{
                      marginBottom: idx < item.text.length - 1 ? '1rem' : 0,
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'specs' && model && (
        <div className={styles['info-block__specs']}>
          {data.map(key => (
            <ModelCharact
              product={model}
              property={key}
              weight={500}
              key={key}
            />
          ))}
        </div>
      )}
    </div>
  );
};
