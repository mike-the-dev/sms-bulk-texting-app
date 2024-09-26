import React from 'react';

interface ButtonClearUploadProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const ButtonClearUpload: React.FC<ButtonClearUploadProps> = (props): React.ReactElement => {
  const onClickHandler = (): void => {
    console.log('Clearing file upload');
  };

  return (
    <button
      type='button'
      disabled={props.disabled ? props.disabled : false}
      onClick={onClickHandler}
      className="
        inline-flex 
        justify-center 
        py-2 
        px-4 
        mr-2
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
      {props.label}
    </button>
  );
};

export default ButtonClearUpload;