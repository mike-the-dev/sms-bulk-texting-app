import React from 'react';

interface ButtonCloseProps {
    onClick: any;
}

const ButtonClose: React.FC<ButtonCloseProps> = (props): React.ReactElement => {
    const { onClick } = props;

    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            className="flex-no-shrink"
            style={{
                cursor: 'pointer'
            }}
            fill="red"
            viewBox="0 0 18 18"
            width="20px"
            height="20px"
        >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    );
};

export default ButtonClose;