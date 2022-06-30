import React, {useState} from 'react';
import './styles/item.css';
import CheckBox from './CheckBox';
import DeleteButton from './DeleteButton';
import Text from './Text';

interface ItemProps {
    completed?: boolean;
    text: string;
}

const Item = ({
    completed,
    text,

}:ItemProps) => {
    
    return (
        <>
            <div className="itemContainer">
                <CheckBox checked={completed}/>
                <Text completed={completed}>
                    {text}
                </Text>
                <DeleteButton/>
            </div>
        </>
    );
}

export default Item;