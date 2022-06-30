import React from 'react';
import './app.css';
import Item from './components/Item';
import TodoList from './components/TodoList';
const App = () => {
    return (
        <>
            <div className="mainContainer">
                <div className="appContainer">
                    <TodoList/>
                </div>
            </div>
        </>
    );
}
export default App;