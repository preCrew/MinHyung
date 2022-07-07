import React from 'react';
import './app.css';
import Item from './components/Item';
import TodoList from './components/TodoList';
const App = () => {
    return (
        <>
            <div className="mainContainer">
                    <TodoList/>
            </div>
        </>
    );
}
export default App;