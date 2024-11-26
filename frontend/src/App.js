import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handleAdd = () => setRefresh(!refresh);

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm onAdd={handleAdd} />
            <TaskList refresh={refresh} />
        </div>
    );
};

export default App;
