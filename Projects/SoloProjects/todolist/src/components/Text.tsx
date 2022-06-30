import React from 'react';
import './styles/text.css';

interface TextProps {
    children: React.ReactNode;
}

const Text = ({
    children
}: TextProps) => {
    return (
        <>
            <div className="text">
                {children}
            </div>
        </>
    );
}

export default Text;