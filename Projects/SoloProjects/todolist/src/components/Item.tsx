import React from 'react';
import './styles/item.css';
import CheckBox from './CheckBox';
import DeleteButton from './DeleteButton';
import Text from './Text';

interface ItemProps {
    onClickCheckBox(id: number): void;
    completed?: boolean;
    text: string;
    id: number;
}

const Item = ({
    onClickCheckBox,
    completed,
    text,
    id,

}:ItemProps) => {
    
    return (
        <>
            <div className="itemContainer">
                <CheckBox checked={completed} onClick={()=>onClickCheckBox(id)}/>
                <Text completed={completed}>
                    {text}
                </Text>
                <DeleteButton/>
            </div>
        </>
    );
}

export default Item;