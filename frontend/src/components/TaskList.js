import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ refresh }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, [refresh]);

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    {task.title}
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
