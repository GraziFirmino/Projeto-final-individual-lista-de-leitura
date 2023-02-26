const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

// adicionando rotas para GET, PUT e DELETE com base no router de tasks
app.get('/api/tasks/:id', tasksRouter);
app.put('/api/tasks/:id', tasksRouter);
app.delete('/api/tasks/:id', tasksRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
