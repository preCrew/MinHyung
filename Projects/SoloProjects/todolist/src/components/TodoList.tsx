import React, {useRef, useState} from 'react';
import Item from './Item';

interface TodoListProps {
    
}

const TodoList = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: '할일 1',
            completed: false,
        },
        {
            id: 2,
            text: '할일 2',
            completed: false,
        },
        {
            id: 3,
            text: '완료한일 1',
            completed: true,
        }
    ]);
    const nextId = useRef(4);

    return (
        <div>
            {tasks.map( task => 
                <Item 
                    text = {task.text}
                    completed={task.completed}
                />
            )}
        </div>
    );
}

export default TodoList;