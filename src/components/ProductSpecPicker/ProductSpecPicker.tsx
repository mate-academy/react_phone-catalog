import './ProductSpecPicker.scss';

type ProductSpecPickerProps = {
  title: string
};

export const ProductSpecPicker = ({
  title,
  children,
}: React.PropsWithChildren<ProductSpecPickerProps>) => (
  <div className="spec-picker">
    <p className="spec-picker__title">{title}</p>

    <ul className="spec-picker__list">
      {children}
    </ul>
  </div>
);
