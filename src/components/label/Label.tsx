import React from 'react';

interface LabelProps {
  text: string;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = (props): React.ReactElement => {
  const { text, htmlFor } = props;

  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {text}
    </label>
  );
};

export default Label;