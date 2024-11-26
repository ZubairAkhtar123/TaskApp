import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/tasks', { title })
            .then(() => {
                setTitle('');
                onAdd();
            })
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={addTask}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TaskForm;
