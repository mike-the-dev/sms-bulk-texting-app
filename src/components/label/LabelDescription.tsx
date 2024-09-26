import React from 'react';

interface LabelDescriptionProps {
  description: string;
}

const LabelDescription: React.FC<LabelDescriptionProps> = (props): React.ReactElement => {
  const { description } = props;

  return (
    <p className="mt-0 text-sm text-gray-500">
      {description}
    </p>
  );
};

export default LabelDescription;