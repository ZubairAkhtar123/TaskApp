const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// RESTful API endpoints
app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    db.run('INSERT INTO tasks (title) VALUES (?)', [title], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title });
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
