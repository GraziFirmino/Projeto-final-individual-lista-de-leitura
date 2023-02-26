const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
