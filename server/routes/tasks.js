const express = require('express');
const db = require('../db');

const router = express.Router();

// Função auxiliar para lidar com erros
function handleError(res, err) {
  console.error(err.message);
  res.status(500).send('Internal server error');
}

// READ (all)
router.route('/')
  .get((req, res) => {
    const sql = 'SELECT * FROM tasks ORDER BY id';
    db.all(sql, [], (err, rows) => {
      if (err) {
        handleError(res, err);
      } else {
        res.send(rows);
      }
    });
  })
  .post((req, res) => {
    const { title, author, category, completed, progress } = req.body;
    const sql = 'INSERT INTO tasks (title, author, category, completed, progress) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [title, author, category, completed, progress], function(err) {
      if (err) {
        handleError(res, err);
      } else {
        const task = { id: this.lastID, title, author, category, completed, progress };
        res.status(201).send(task);
      }
    });
  });

// READ (one), UPDATE, DELETE
router.route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        handleError(res, err);
      } else if (!row) {
        res.status(404).send('Task not found');
      } else {
        res.send(row);
      }
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    const { title, author, category, completed, progress } = req.body;
    const sql = 'UPDATE tasks SET title = ?, author = ?, category = ?, completed = ?, progress = ? WHERE id = ?';
    db.run(sql, [title, author, category, completed, progress, id], function(err) {
      if (err) {
        handleError(res, err);
      } else if (this.changes === 0) {
        res.status(404).send('Task not found');
      } else {
        const task = { id, title, author, category, completed, progress };
        res.send(task);
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, [id], function(err) {
      if (err) {
        handleError(res, err);
      } else if (this.changes === 0) {
        res.status(404).send('Task not found');
      } else {
        res.status(204).send();
      }
    });
  });

module.exports = router;
