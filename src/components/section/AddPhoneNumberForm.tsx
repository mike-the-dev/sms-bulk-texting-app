import React, { useState } from 'react';
import { ButtonClearUpload, ButtonExcel, ButtonPrimary } from '../button';

interface AddPhoneNumberFormProps {
  addPhoneNumber: (phoneNumber: string) => void;
  addPhoneNumberBulk: (file: any) => void;
  updateFile: (file: File) => void;
  removeFile: () => void;
  clearRows: () => void;
  toggleIsUploadingPhoneNumbers: () => void;
  isSubmitted: boolean;
  file: File | null;
};

export const sanitizePhoneText = (text: string): string => {
  const regex: RegExp = /[0-9]/g;

  const newValue: string[] = text.split('');
  const removeSpacesValue: string[] = newValue.filter(letter => letter.match(regex));
  const joinedText: string = removeSpacesValue.join('');

  if (joinedText.length >6) return `(${joinedText.substring(0, 3)})-${joinedText.substring(3, 6)}-${joinedText.substring(6, 10)}`;

  if (joinedText.length > 3) return `(${joinedText.substring(0, 3)})-${joinedText.substring(3, 6)}`;

  return joinedText.substring(0, 3);
};

const AddPhoneNumberForm: React.FC<AddPhoneNumberFormProps> = (props): React.ReactElement => {
  const { addPhoneNumber, isSubmitted } = props;

  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = event;
    let phoneNumber: string = value;

    const formattedNumber = sanitizePhoneText(phoneNumber);

    setPhoneNumber(formattedNumber);
  };

  const handleOnSubmit = (): void => {
    addPhoneNumber(phoneNumber);
    setPhoneNumber('');
  };

  const handleOnKeyDown = (e: any): void => {
    // console.log(e.keyCode);
    // if (e.keyCode === 16 || e.keyCode === 17 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 65) {
    //   e.preventDefault();
    // }
  };

  const handleOnPaste = (e: any): void => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mt-1 mb-2 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
          +1
        </span>
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          autoComplete="off"
          onPaste={handleOnPaste}
          onKeyDown={handleOnKeyDown}
          value={phoneNumber}
          onChange={handleOnChange}
          className="
            flex-1 
            block 
            w-full 
            rounded-none 
            rounded-r-md 
            sm:text-sm 
            border
            border-gray-300 
            p-2
            focus:outline-none
            focus:ring-2
            focus:ring-violet
            "
          placeholder="(222) 333-4444"
        />
      </div>
      <div className="flex justify-end">
        <ButtonExcel 
          updateFile={props.updateFile} 
          removeFile={props.removeFile} 
          clearRows={props.clearRows} 
          label="Upload CSV" 
          disabled={isSubmitted || props.file ? true : false} 
          disabled2={isSubmitted || !props.file ? true : false} 
        />
        <ButtonPrimary onClick={handleOnSubmit} label="Add Phone Number" disabled={isSubmitted} />
      </div>
    </>
  );
};

export default AddPhoneNumberForm;