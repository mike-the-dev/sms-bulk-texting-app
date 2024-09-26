import React from 'react';

interface ButtonPrimaryProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = (props): React.ReactElement => {
  const { onClick, label, disabled }: ButtonPrimaryProps = props;

  return (
    <button
      type="submit"
      disabled={disabled ? disabled : false}
      onClick={onClick}
      className="
        inline-flex 
        justify-center 
        py-2 
        px-4 
        border 
        border-transparent 
        shadow-sm 
        text-sm 
        font-medium 
        rounded-md 
        text-white 
        bg-[#5840C1] 
        hover:bg-indigo-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-indigo-500
        disabled:opacity-50">
      {label}
    </button>
  );
};

export default ButtonPrimary;