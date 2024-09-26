import React, { useEffect, useState } from 'react';

interface TextMessageProps {
  name: string;
  setTextMessage: any;
  isSyncing: boolean;
  setSyncing: any;
}

const TextMessage: React.FC<TextMessageProps> = (props): React.ReactElement => {
  const { name, setTextMessage, isSyncing, setSyncing } = props;

  const [message, setMessage] = useState('');
  // const [isSyncing, setSyncing] = useState<boolean>(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { target: { value } } = event;

    setMessage(value);
    setSyncing(true);
  };

  useEffect(() => {
    if(isSyncing) {
      const timer = setTimeout(() => {
        setTextMessage(message);
        setSyncing(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
    <div className="mt-1 mb-2 flex rounded-md shadow-sm">
      <textarea
        name={name}
        id={name}
        value={message}
        onChange={handleOnChange}
        rows={3}
        className="
            flex-1 
            block 
            w-full 
            rounded-none 
            rounded
            sm:text-sm 
            border
            border-gray-300 
            p-2
            focus:outline-none
            focus:ring-2
            focus:ring-violet
            "
        placeholder="Write your text message here..."
      />
    </div>
      <div className="flex mt-1 justify-end">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke={isSyncing ? 'violet': 'transparent'} strokeWidth="4"></circle>
          <path className="opacity-75" fill={isSyncing ? 'violet': 'transparent'} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </>
  );
};

export default TextMessage;