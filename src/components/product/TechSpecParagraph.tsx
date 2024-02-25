import './ProductCard.scss';

type Props = {
  fieldName: string,
  fieldDescription: string,
};

export const TechSpecParagraph: React.FC<Props> = ({
  fieldName,
  fieldDescription,
}) => {
  return (
    <div className="dflex mb-8" style={{ justifyContent: 'space-between' }}>
      <div>{fieldName}</div>
      <div style={{ color: '#313237' }}>
        {fieldDescription.replace(' inches', '"')}
      </div>
    </div>
  );
};
