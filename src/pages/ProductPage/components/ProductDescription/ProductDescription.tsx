import { Description } from '../../../../types/Product';
import styles from '../../ProductPage.module.scss';

type Props = {
  description: Description[];
};

export const ProductDescription: React.FC<Props> = ({ description }) => {
  return (
    <div>
      {description.map(info => {
        return (
          <div key={info.title}>
            <p className={`${styles.title} text--semi-bold`}>{info.title}</p>
            {info.text.map((text, index) => (
              <p key={index} className="text--grey">
                {text}
                {index !== info.text.length - 1 && (
                  <>
                    <br /> <br />
                  </>
                )}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
