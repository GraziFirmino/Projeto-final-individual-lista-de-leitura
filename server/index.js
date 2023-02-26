const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

// adicionando rotas para GET, PUT e DELETE com base no router de tasks
app.get('/api/tasks/:id', (req, res) => {
    // manipulador de rota para a rota GET /api/tasks/:id
    // chama o manipulador de rota correspondente no router de tasks
    tasksRouter.get(req, res);
  });
  
  app.put('/api/tasks/:id', (req, res) => {
    // manipulador de rota para a rota PUT /api/tasks/:id
    // chama o manipulador de rota correspondente no router de tasks
    tasksRouter.put(req, res);
  });
  
  app.delete('/api/tasks/:id', (req, res) => {
    // manipulador de rota para a rota DELETE /api/tasks/:id
    // chama o manipulador de rota correspondente no router de tasks
    tasksRouter.delete(req, res);
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
