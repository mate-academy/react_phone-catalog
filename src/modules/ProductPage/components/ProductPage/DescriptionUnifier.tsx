import React from 'react';

interface DescriptionUnifierProps {
  partsOfDescription: Array<{ title: string; text: string[] }>;
}

export const DescriptionUnifier: React.FC<DescriptionUnifierProps> = ({
  partsOfDescription,
}) => {
  const unifiedDescription = partsOfDescription.map(part => {
    const fullText = part.text.reduce((prev, text) => {
      return prev + '\n \n' + text;
    }, '');

    return { title: part.title, description: fullText.trim() };
  });

  return (
    <React.Fragment>
      {unifiedDescription.map(desc => {
        return (
          <div key={desc.title} className="productPage__description">
            <h4 className="productPage__descriptionHeader">{desc.title}</h4>
            <p className="productPage__descriptionText">{desc.description}</p>
          </div>
        );
      })}
    </React.Fragment>
  );
};
