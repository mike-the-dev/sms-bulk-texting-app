import React, { useRef } from 'react';

interface ButtonExcelProps {
  updateFile: (file: File) => void; 
  removeFile: () => void; 
  clearRows: () => void; 
  label: string;
  disabled?: boolean;
  disabled2?: boolean;
};

const ButtonExcel: React.FC<ButtonExcelProps> = (props): React.ReactElement => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onClickHandler = (): void => {
    inputFileRef.current?.click();
  };

  const onChangeFileHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('File Handler On Change Event Fired!', event);

    if (!event.target.files) return;

    props.updateFile(event.target.files[0]);
  };

  const onRemoveFileHandler = () => {
    if (!inputFileRef.current) return;
    inputFileRef.current.value = '';
    props.removeFile();
    props.clearRows();
  };

  return (
    <>
      <input 
        ref={inputFileRef} 
        type='file' 
        name='file' 
        accept=".csv" 
        onChange={onChangeFileHandler} 
        style={{ display: 'none' }} 
      />
      <button
        type='button'
        disabled={props.disabled2 ? props.disabled2 : false}
        onClick={onRemoveFileHandler}
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
        Remove Upload
      </button>
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
    </>
  );
};

export default ButtonExcel;