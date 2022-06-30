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

    const handleClickCheckBox = (id: number) => {
        // 해당 id를 가진 컴포넌트의 completed 상태 변경
        setTasks(tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
        ));
    }
    const handleClickDeleteButton = (id: number) => {
        // 해당 id를 가진 컴포넌트 삭제
        setTasks(tasks.filter( task => task.id !== id));
    }
    return (
        <div>
            {tasks.map( task => 
                <Item 
                    id = {task.id}
                    text = {task.text}
                    completed={task.completed}
                    onClickCheckBox={handleClickCheckBox}
                    onClickDeleteButton={handleClickDeleteButton}
                />
            )}
        </div>
    );
}

export default TodoList;