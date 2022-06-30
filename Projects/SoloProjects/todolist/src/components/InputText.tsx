import React from 'react';
import './styles/inputText.css';

interface InputTextProps {
    
}

const InputText = () => {
    return (
        <>
            <input type="text"
                className="inputText"  
                placeholder='내용을 입력후 엔터'
            />
        </>
    );
}

export default InputText;